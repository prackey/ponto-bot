const db = [];

exports.pontoEventMessage = function (message) {
	message.channel.send(`
  --- Comandos disponíveis: ---
  🕒 !ponto inicio
  ⌛ !ponto fim
  `);
};

exports.pontoInicioMessage = function (message) {
	const conectado = message.member.voice?.channel?.name.startsWith('work');

	if (conectado) {
		// Checar se jornada já foi iniciado
		if (db.findIndex((i) => i.id === message.author?.id) !== -1) {
			message.reply('Sua jornada de trabalho já foi iniciada.');

			return;
		}

		// Iniciar jornada de trabalho
		message.reply(
			'Conectado ao canal de trabalho, iniciando jornada de trabalho.'
		);

		// Salvar status no DB
		db.push({
			id: message.author?.id,
			startDate: message.createdAt,
		});
	} else {
		message.reply('Você precisa estar conectado a algum canal de trabalho.');
	}
};
