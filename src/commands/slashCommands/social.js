const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require('discord.js');

const social = {
	data: new SlashCommandBuilder()
		.setName('social')
		.setDescription('The bot sends out our current social media links'),
	async execute(interaction) {
		//you can do this all on one line?
		// Yeah, you can chain funtion calls since they return the embed object
		const row = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setLabel('Instagram')
				.setStyle(ButtonStyle.Link)
				.setURL('https://www.instagram.com/codeforall_qc')
		]);
		const embed = new EmbedBuilder()
			.setColor('#3eaf7c')
			.setThumbnail('https://i.imgur.com/fT5JpUH.jpeg')
			.setTitle('Here are our current socials!')

		await interaction.reply({ embeds: [embed], components: [row] });
	}
};

module.exports = social; 
