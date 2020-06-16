const Moment = require('moment');
const Ponto = require('../database/models/Ponto');

exports.pontoEventMessage = function (message) {
	message.channel.send(`
  --- Comandos disponíveis: ---
  🕒 !ponto inicio
  ⌛ !ponto fim
  `);
};

exports.pontoInicioMessage = async function (message) {
	const conectado = message.member.voice?.channel?.name.startsWith('work');

	if (conectado) {
		// Checar se jornada já foi iniciado
		const pontoExistente = await Ponto.findOne({
			status: 1,
			usuarioId: message.author.id,
			dataInicio: {
				$gt: Moment().hour(0).toDate(),
			},
		}).lean();

		if (pontoExistente) {
			message.reply('Sua jornada de trabalho já foi iniciada.');

			return;
		}

		// Iniciar jornada de trabalho
		message.reply(
			'Conectado ao canal de trabalho, iniciando jornada de trabalho.'
		);

		// Salvar status no DB

		await Ponto.create({
			status: 1,
			usuarioId: message.author.id,
			dataInicio: Date.now(),
		});

		return;
	} else {
		message.reply('Você precisa estar conectado a algum canal de trabalho.');
	}
};

exports.pontoFimMessage = async function (message) {
	const pontoExistente = await Ponto.findOne({
		status: 1,
		usuarioId: message.author.id,
		dataInicio: {
			$gt: Moment().hour(0).toDate(),
		},
	}).lean();

	if (!pontoExistente) {
		message.reply('Sua jornada de trabalho não foi iniciada ainda hoje');

		return;
	} else {
		await Ponto.findOneAndUpdate(
			{ _id: pontoExistente._id },
			{ status: 0, dataFim: Date.now() }
		);

		message.reply('Ponto Batido! Jornada de trabalho finalizada');
		return;
	}
};
