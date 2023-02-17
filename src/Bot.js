const { promise } = require('readdirp');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

class Bot extends Client {
	constructor() {
		super({
			partials: [Partials.Channel, Partials.Message, Partials.Reaction],
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.MessageContent
			]
		});
		this.commands = new Collection();
		this.course = '';
	}

	async loadEvents() {
		// Read the src/events folder recursively using the readdirp module
		for (const e of await promise('src/events', { fileFilter: '*.js' })) {
			const event = require(e.fullPath);

			this[event.once ? 'once' : 'on'](event.name, async (...args) => {
				await event.execute(...args);
			});
		}
		console.log('Loaded events.');
	}

	async loadCommands() {
		for (const c of await promise('src/commands', { fileFilter: '*.js' })) {
			const command = require(c.fullPath);

			this.commands.set(command.data.name, command);
			if (command.modalCustomId) {
				this.commands.set(command.modalCustomId, command);
			}
		}
		console.log('Loaded commands.');
	}
}

module.exports = new Bot();