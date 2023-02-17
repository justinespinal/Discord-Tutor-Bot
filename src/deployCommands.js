const readdirp = require('readdirp');
const { REST, Routes } = require('discord.js');

const deployCommands = async () => {
	const commands = [];
	const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

	for await (const c of readdirp('src/commands', { fileFilter: '*.js' })) {
		const command = require(c.fullPath);
		commands.push(command.data.toJSON());
	}

	try {
		await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_SERVER),
			{ body: commands }
		);
		console.log(`Successfully registered ${commands.length} application commands.`);
	} catch (error) {
		console.error(error);
	}
};

module.exports = deployCommands;
