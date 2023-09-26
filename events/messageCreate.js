const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(msg) {
        if (msg.author.bot){ 
            return;
        };
        const prefix = "/";
        
        if (!msg.content.startsWith(prefix)){
            return;
        };
    
        const [commandName, ...args] = msg.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);
    
        //const command = client.commands.get(commandName);
        msg.reply(`No command matching /${commandName} was found.`);
    },
}