import mongoose from 'mongoose'

const connectDb = async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Db connected successfuly");
        
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/ClearBg`)
}

export default connectDb