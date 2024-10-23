import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    photo: { type: String, required: true},
    firstName: { type: String,default:"Gyan"},
    lastName: { type: String,default:"Singh"},
    creditBalance: { type: Number, default:10},
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel;