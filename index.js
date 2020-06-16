require('dotenv').config();
const { Client } = require('discord.js');

const {
	pontoEventMessage,
	pontoInicioMessage,
	pontoFimMessage,
	statusUsuario,
} = require('./src/events/ponto');
const { connectDB } = require('./src/database/connection');

const client = new Client();

connectDB();

client.on('ready', () => {
	console.log(`Login efetuado com sucesso ${client.user.tag}!`);
});

client.on('message', (message) => {
	if (message.content === 'toda vez que eu vejo voce') {
		message.channel.send('sinto uma coisa diferente');
	}

	if (message.content === '!status') {
		statusUsuario(message);
	}

	if (message.content === '!ponto') {
		pontoEventMessage(message);
	}

	// !ponto
	if (message.content === '!ponto inicio') {
		pontoInicioMessage(message);
	}

	if (message.content === '!ponto fim') {
		pontoFimMessage(message);
	}

	return;
});

client.login(process.env.DISCORD_TOKEN || 'token');
