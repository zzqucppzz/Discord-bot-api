require('dotenv').config();

const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', msg => {
    const prefix = "$";
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLocaleLowerCase();

    if (command === 'ping') {
       msg.reply(`pong`);
    }

    if (command === '') {}
});

client.login(process.env.TOKEN);

