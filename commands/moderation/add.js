const { SlashCommandBuilder} = require('discord.js');
const student = require('../../config/models/Student')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Display all members')
        .addStringOption(option =>
            option
            .setName('username')
            .setDescription('add username')
            .setRequired(true))
        .addNumberOption(option =>
            option
            .setName('age')
            .setDescription('add age'))
        .addStringOption(option =>
            option
            .setName('email')
            .setDescription('add email'))
        .addStringOption(option =>
            option
            .setName('user_type')
            .setDescription('add type of user')),
    async execute(interaction) {
        await student.create({
            username: interaction.options.getString('username'),
            age: interaction.options.getNumber('age'),
            email: interaction.options.getString('email'),
            user_type: interaction.options.getString('user_type')
        });

        await interaction.reply(`Add member to MongoDB successful`);
    },
};