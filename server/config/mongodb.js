
import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database Connected');
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/clear-bg`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDb;
