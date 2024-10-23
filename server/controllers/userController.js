
import { Webhook } from 'svix';
import userModel from '../models/userModel.js';
// import { userModel } from "../models/userModel.js";
// API controller Function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async(req,res)=>{
    
    try {
        // Create svix instance with clerk webhok secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        const {data, type} = req.body;
        switch (type) {
            case "user.created":{
                const userData = {
                    clerkId:data.id,
                    email:email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }

                await userModel.create(userData)
                res.json({})

                break;
            }
            case "user.updated":{
                const userData = {
                    email:email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }
                await userModel.findOneAndUpdate({clerkId:data.id},userData)
                res.json({})
                break;
            }
            case "user.deleted":{
                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({})
                break;
            }
                
        
            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}


export {clerkWebhooks}