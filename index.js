require('dotenv').config();
const { Client } = require('discord.js');

const client = new Client();

const db = [];

client.on('ready', () => {
	console.log(`Login efetuado com sucesso ${client.user.tag}!`);
});

client.on('message', (message) => {
	if (message.content === 'toda vez que eu vejo voce') {
		// message.reply('pong');
		message.channel.send('sinto uma coisa diferente');
	}

	if (message.content.startsWith('!ponto')) {
		const conectado = message.member.voice?.channel?.name.startsWith('work');

		if (conectado) {
			message.reply(
				'Conectado ao canal de trabalho, iniciando jornada de trabalho.'
			);
		} else {
			message.reply('Você precisa estar conectado a algum canal de trabalho.');
		}
	}
});

client.login(process.env.DISCORD_TOKEN || 'token');
