/*const { Events, ChannelType, PermissionFlagsBits } = require('discord.js');

const messageReactionAdd = {
	name: Events.MessageReactionAdd,
	once: false,
	async execute(reaction, user) {
		try {
			if (user.bot) return;
			if (reaction.message.id === '1070527839503384586' && reaction.emoji.name === '📩') {
				const guild = reaction.message.guild;
				let channels = await guild.channels.fetch();
				channels = channels.filter((channel) => channel.parentId === '1070529903369400420');

				if (channels.some((channel) => channel.name === `${user.username.toLowerCase()}-${user.discriminator}-session`)) {
					return await user.send('You already created a private channel! Check under the tutor category to find your channel!');
				}
				const createdChannel = await guild.channels.create({
					parent: '1070529903369400420',
					name: `${user.username.toLowerCase()}-${user.discriminator}-session`,
					type: ChannelType.GuildText,
					permissionOverwrites: [
						{ id: "1013605591723290684", deny: [PermissionFlagsBits.ViewChannel] },
						{
							id: user.id,
							allow: [PermissionFlagsBits.ViewChannel]
						}
					]
				});
				console.log(`Created a tutoring channel for ${user.tag}!`)
				await createdChannel.send(`${user}, a tutoring session was created for you. @ a Workshop Dev to get started!`);
			}
		} catch (error) {
			switch (error.code) {
				case 50007:
					console.log(`Couldn't send dm to ${user.tag}.`);
					break;
				default:
					console.log(error.message);
					break;
			}
		}
	}
};

module.exports = messageReactionAdd;*/
