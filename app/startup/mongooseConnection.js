import mongoose from 'mongoose';

const dbConnectin = async () => {
    try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('>> MongoDb connection successful');
    } catch (e) {
        console.log({ info: 'MongoDb Connection Failed', message: e.message, error: e });
        process.exit(0);
    }
};

export default dbConnectin;
