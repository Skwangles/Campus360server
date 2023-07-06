const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.disconnect()
    try {
        await mongoose.connect('mongodb://admin:password@localhost:27017', {
            dbName: 'campusvirtual',
            authSource: "admin",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 20000,
            heartbeatFrequencyMS: 10000,
            retryWrites: true,
            w: "majority",
        });
        console.log("Database Connected!")
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

mongoose.connection.on('error', err => {
    console.error(err);
});

module.exports = connectDB;
