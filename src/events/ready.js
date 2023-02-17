const { Events } = require('discord.js');

const ready = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`${client.user.tag} is online!`);
	}
};

module.exports = ready;
