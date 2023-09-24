const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
};


/*
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	console.log(event);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};

*/



client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	console.log(interaction);
	if (!interaction.isChatInputCommand()){ 
		return;
	};

	const command = client.commands.get(interaction.commandName);
	console.log(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
/*
client.on(Events.MessageCreate, async msg => {
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

	const command = client.commands.get(commandName);

	try {
		await command.execute(interaction);
	} catch (error) {
			console.error(`Error executing ${commandName}`);
			console.error(error);
	}
});

/*
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
});
  
client.on(Events.MessageCreate, async msg => {
  	console.log(msg.content);
	const prefix = "$";
	if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)){     
		return;
	};
  
	const [command, ...args] = msg.content
		.trim()
		.substring(prefix.length)
		.split(/\s+/);
  
	console.log(command);
	if (command === 'ping') {
		msg.reply(`pong`);
	};	  
  
});
*/

client.login(token);