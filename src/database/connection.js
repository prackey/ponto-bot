const { connect, connection } = require('mongoose');

const { MONGO_URL, DB_NAME } = process.env;

exports.connectDB = function connectDB() {
	connect(MONGO_URL || 'mongodb://127.0.0.1:27017', {
		dbName: DB_NAME || 'PontoBot',
		connectTimeoutMS: 10000,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000,
		useNewUrlParser: true,
		keepAlive: true,
		poolSize: 10,
		useFindAndModify: false,
	});
};

connection.on('connected', () => {
	console.info(`🍃 MongoDB Connected.✅`);
});

connection.on('connecting', () => {
	console.info('🍃 Connecting to MongoDB...🔌');
});

connection.on('error', (err) => {
	console.error('🍃 MongoDB Connection ERROR ❌');
	console.error(err);
});
