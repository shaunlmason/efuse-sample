import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { MONGO_URL = `mongodb://localhost:${process.env.MONGO_PORT}/efuse` } = process.env;

const db = mongoose.connection;

db.on('error', (error: Error) => {
    console.error(`💣\xa0\xa0 [ERROR] mongo - ${error.message || error}`);
    process.exit(1);
});

db.once('open', () => {
    console.info(`🐍\xa0\xa0 mongodb connected on port ${process.env.MONGO_PORT}`);
});

const init = async () => {
    await mongoose.connect(MONGO_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

export { init, db };
