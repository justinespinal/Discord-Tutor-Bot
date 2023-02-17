const { SlashCommandBuilder } = require('discord.js');

const purpose = {
	data: new SlashCommandBuilder()
		.setName('purpose')
		.setDescription("Learn about this server's purpose!"),
	async execute(interaction) {
		await interaction.reply('The mission of Code for All is to empower students of all backgrounds to excel in their problem-solving and coding classes. We strive to create a supportive and inclusive learning environment where everyone can deepen their understanding of code and develop the skills necessary to tackle complex challenges. Together, we will help each other achieve our full potential as coders and problem-solvers!');
	}
};

module.exports = purpose;
