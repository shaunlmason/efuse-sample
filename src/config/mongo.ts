import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { MONGO_URL = `mongodb://localhost:${process.env.MONGO_PORT}/efuse` } = process.env;

const db = mongoose.connection;

db.on('error', (error: Error) => {
    console.error('💣' + +'\xa0\xa0' + `[ERROR] mongo - ${error.message || error}`);
    process.exit(1);
});

db.once('open', () => {
    console.info('🐍' + '\xa0\xa0' + `mongodb connected on port ${process.env.MONGO_PORT}`);
});

const init = async () => {
    await mongoose.connect(MONGO_URL, {
        // Make Mongoose's default index build use createIndex() instead of ensureIndex()
        // to avoid deprecation warnings from the MongoDB driver
        useCreateIndex: true,
        // Set to false to make findOneAndUpdate() and findOneAndRemove()
        // use native findOneAndUpdate() rather than findAndModify()
        useFindAndModify: false,
        // The underlying MongoDB driver has deprecated their current connection string parser.
        useNewUrlParser: true,
        // To opt in to using the MongoDB driver's new connection management engine.
        // https://mongoosejs.com/docs/deprecations.html#useunifiedtopology
        useUnifiedTopology: true
    });
};

export { init, db };
