const { Events, InteractionType } = require('discord.js');

const interactionCreate = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (
			interaction.type === InteractionType.ApplicationCommand ||
			interaction.isContextMenuCommand() ||
			interaction.isChatInputCommand()
		) {
			try {
				const command = interaction.client.commands.get(interaction.commandName);

				if (!command) {
					return await interaction.reply({
						content: "This command doesn't exist.",
						ephemeral: true
					});
				}

				console.log(command.data.name, interaction.user.tag);
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true
				});
			}
		} else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			const autocompleteCommand = interaction.client.commands.get(interaction.commandName);
			await autocompleteCommand.suggestions(interaction);
		} else if (interaction.type === InteractionType.ModalSubmit) {
			const command = interaction.client.commands.get(interaction.customId);
			await command.modalResponse(interaction);
		}
	}
}


module.exports = interactionCreate;
