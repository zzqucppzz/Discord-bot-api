const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption(option => 
			option.setName('target')
			.setDescription('The member to check')
			.setRequired(true)
			),
	async execute(interaction) {

		
		await interaction.reply({content:`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`, ephemeral: true});
	},
};