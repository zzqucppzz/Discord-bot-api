const { SlashCommandBuilder} = require('discord.js');
const student = require('../../config/models/Student')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('all')
		.setDescription('Display all members'),
    async execute(interaction) {
        const members = await student.find({},{_id:false,username: true});
        const usernames = members.map((member) => `@${member.username}`).join(" ");

        await interaction.reply(`Hey everyone ${usernames}`);
    },
};