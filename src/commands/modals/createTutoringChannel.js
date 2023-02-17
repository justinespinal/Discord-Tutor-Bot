const {
	SlashCommandBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder,
	PermissionFlagsBits,
	ChannelType
} = require('discord.js');

const createTutoringChannel = {
	data: new SlashCommandBuilder()
		.setName('create_tutoring_channel')
		.setDescription("Create a private tutoring channel for you.")
		.addStringOption(option =>
			option
				.setName('course')
				.setDescription('Choose the course you need tutoring for.')
				.setRequired(true)
				.addChoices(
					{ name: 'CS 111', value: 'CS 111' },
					{ name: 'CS 211', value: 'CS 211' },
					{ name: 'CS 212', value: 'CS 212' },
					{ name: 'CS 220', value: 'CS 220' },
					{ name: 'Math 120', value: 'Math 120' },
					{ name: 'Other', value: 'Other' },
				)
		),
	modalCustomId: 'tutoringChannelModal',
	async execute(interaction) {
		interaction.client.course = interaction.options.getString('course');
		const modal = new ModalBuilder()
			.setCustomId('tutoringChannelModal')
			.setTitle('Tutor Submission Ticket');
		const reasonInput = new TextInputBuilder()
			.setCustomId('tutoringFor')
			.setLabel('What do you need tutoring for?')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true);
		const firstActionRow = new ActionRowBuilder().addComponents([reasonInput])

		modal.addComponents(firstActionRow);
		await interaction.showModal(modal)
	},
	async modalResponse(interaction) {
		try {
			const reason = interaction.fields.getTextInputValue('tutoringFor');
			const guild = interaction.guild;
			const user = interaction.user;
			const channels = await guild.channels.fetch();

			if (
				channels.some((channel) => channel.name === `${user.username.toLowerCase()}-${user.discriminator}-session`)
			) {
				return await interaction.user.send('You already created a private channel! Check under the tutor category to find your channel!');
			}

			const createdChannel = await guild.channels.create({
				parent: '1070529903369400420',
				name: `${user.username.toLowerCase()}-${user.discriminator}-session`,
				type: ChannelType.GuildText,
				topic: reason,
				permissionOverwrites: [
					{ id: "1013605591723290684", deny: [PermissionFlagsBits.ViewChannel] },
					{
						id: user.id,
						allow: [PermissionFlagsBits.ViewChannel]
					}
				]
			});

			console.log(`Created a tutoring channel for ${user.tag}!`)
			await createdChannel.send(`${user}, a tutoring session was created for you. @ a Workshop Dev to get started!\n__Course__\n${interaction.client.course}\n__Reason__\n${reason}`);
			await interaction.reply({
				content: `Your tutoring channel has been created, here it is <#${createdChannel.id}>!`,
				ephemeral: true
			});
		} catch (error) {
			switch (error.code) {
				case 50007:
					console.log(`Couldn't send dm to ${interaction.user.tag}.`);
					await interaction.reply({ content: "You already have a tutoring channel.", ephemeral: true });
					break;
				default:
					console.log(error.message);
					break;
			}
		}
	}
};

module.exports = createTutoringChannel;
