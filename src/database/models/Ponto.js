const { model, Schema } = require('mongoose');

const pontoSchema = new Schema({
	// 0 - Off
	// 1 - On
	// 2 - Pausado
	status: {
		type: Number,
		required: true,
		default: 0,
	},
	usuarioId: {
		type: String,
		required: true,
	},
	dataInicio: {
		type: Date,
		required: true,
	},
	dataFim: {
		type: Date,
		required: false,
	},
});

module.exports = model('Ponto', pontoSchema);
