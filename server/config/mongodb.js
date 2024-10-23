import mongoose from 'mongoose'

const connectDb = async ()=>{
    mongoose.connection.on('connected', ()=>{
        console.log("Database Connected");
        
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/clear-bg`)
}

export default connectDb


// import mongoose from 'mongoose';

// const connectDb = async () => {
//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error('MONGODB_URI is not defined in environment variables');
//     }

//     mongoose.connection.on('connected', () => {
//       console.log('Database connected successfully');
//     });

//     mongoose.connection.on('error', (err) => {
//       console.error('Error connecting to the database:', err);
//     });

//     // Connect without deprecated options
//     await mongoose.connect(`${process.env.MONGODB_URI}/ClearBg`);

//   } catch (error) {
//     console.error('Failed to connect to the database:', error);
//     process.exit(1); // Exit process with failure
//   }
// };

// export default connectDb;
