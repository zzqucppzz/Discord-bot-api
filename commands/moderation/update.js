const { SlashCommandBuilder} = require('discord.js');
const student = require('../../config/models/Student')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('Update member')
        .addStringOption(option =>
            option
            .setName('id')
            .setDescription('add id')
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName('name')
            .setDescription('update name'))
        .addNumberOption(option =>
            option
            .setName('age')
            .setDescription('update age'))
        .addStringOption(option =>
            option
            .setName('email')
            .setDescription('update email'))
        .addStringOption(option =>
            option
            .setName('user_type')
            .setDescription('update email')),
    async execute(interaction) {
        const id = interaction.options.getString('id');
        const username = interaction.options.getString('username');
        const age = interaction.options.getNumber('age');
        const email = interaction.options.getString('email');
        const user_type = interaction.options.getString('user_type');

        if (username){
            console.log(1);
            await student.updateOne({username: `${id}`},{username: username});
        }
        if (age)
            await student.updateOne({_id: `${id}`},{age: age});
        if (email)
            await student.updateOne({_id: `${id}`},{email: email});
        if (user_type)
            await student.updateOne({_id: `${id}`},{user_type: user_type});

        await interaction.reply(`Update member to MongoDB successful`);
    },
};