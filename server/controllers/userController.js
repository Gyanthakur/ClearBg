import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
// API controller Function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

// const clerkWebhooks = async (req, res) => {
// 	try {
// 		// Create a svix instance with clerk webhook secret
// 		const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

// 		await whook.verify(JSON.stringify(req.body), {
// 			"svix-id": req.headers["svix-id"],
// 			"svix-timestamp": req.headers["timestamp"],
// 			"svix-signature": req.headers["svix-signature"],
// 		});

// 		const { data, type } = req.body;

// 		switch (type) {
// 			case "user.created": {
// 				const userData = {
// 					clerkId: data.id,
// 					email: data.email_addresses[0].email_address,
// 					firstName: data.first_name,
// 					lastName: data.last_name,
// 					photo: data.image_url,
// 				};
// 				await userModel.create(userData);
// 				res.json({ success: true, message: "User Created" });

// 				break;
// 			}
// 			case "user.updated": {
// 				const userData = {
// 					email: data.email_addresses[0].email_address,
// 					firstName: data.first_name,
// 					lastName: data.last_name,
// 					photo: data.image_url,
// 				};
// 				await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
// 				res.json({});
// 				break;
// 			}
// 			case "user.deleted": {
// 				await userModel.findOneAndDelete({ clerkId: data.id });
// 				res.json({});
// 				break;
// 			}

// 			default:
// 				break;
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

const clerkWebhooks = async (req, res) => {
    try {
        // Create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook request
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],            // Header for request ID
            "svix-timestamp": req.headers["svix-timestamp"], // Correct header name for timestamp
            "svix-signature": req.headers["svix-signature"], // Header for the signature
        });

        const { data, type } = req.body;

        // Handle different webhook events
        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };
                await userModel.create(userData);
                return res.json({ success: true, message: "User Created" });

            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                return res.json({ success: true, message: "User Updated" });
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                return res.json({ success: true, message: "User Deleted" });
            }
            default:
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (error) {
        console.error("Webhook verification error:", error); // Log the error for debugging
        return res.status(400).json({ success: false, message: "Missing required headers" });
    }
};

// API controller functopn to get user available credits data
const userCredits = async (req, res) => {
	try {
		const { clerkId } = req.body;
		const userData = await userModel.findOne({ clerkId });

		res.json({ success: true, credits: userData.creditBalance });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

// Gateway initialize 
// const razorpayInstance = ({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET
// })

// // API to make payments for credits
// const paymentRazorpay = async(req,res) => {
//     try {
//         console.log('body' , req.body);
//         const {clerkId, planId} = req.body;
        
//         const userData = await userModel.findOne({clerkId:clerkId})
//         console.log('userdata',userData);
        
//         if(!userData || !planId){
//             console.log('user data and plan id');
            
//             return res.json({success:false,message:"Invalid Credentials"})
//         }
//         let credits, plan, amount, date

//         console.log('going to use switch');
        

//         switch (planId) {
//             case "Basic":{
//                 console.log('in basic');
                
//                 plan= 'Basic'
//                 credits= 100
//                 amount= 10
//                 break;
//                 }
        
//             case "Advanced":{
//                 plan= 'Advanced'
//                 credits= 500
//                 amount= 50
//                 break;
//             }
        
//             case "Business":{
//                 plan= 'Business'
//                 credits= 5000
//                 amount= 250
//                 break;
//             }
        
//             default:{
//                 console.log('in default');
                
//                 break;

//             }
//         }

//         date = Date.now()

//         // creating transaction
//         const transactionData = {
//             clerkId,
//             plan,
//             amount,
//             credits,
//             date
//         }

//         console.log('going to create new transaction');
        

//         const newTransaction = await transactionModel.create(transactionData)

//         const options = {
//             amount: amount*100,
//             currency: process.env.CURRENCY,
//             receipt: newTransaction._id
//         }

//         await razorpayInstance.orders.create(options,(error,order)=>{
//             if(error){
//                 return res.json({success:false,message:error})
//             }
//             res.json({success:true,order})
//         })


//     } catch (error) {
//         console.log(error);
// 		res.json({ success: false, message: "error on razorpay" });
//     }
// }



const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { clerkId, planId } = req.body;

        // Check if user exists
        const userData = await userModel.findOne({ clerkId });
        console.log('User data:', userData);

        if (!userData || !planId) {
            console.log('Missing user data or planId');
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        let credits, plan, amount;

        console.log('Processing plan...');
        switch (planId) {
            case 'Basic': {
                plan = 'Basic';
                credits = 10;
                amount = 2;
                break;
            }
            case 'Advanced': {
                plan = 'Advanced';
                credits = 50;
                amount = 5;
                break;
            }
            case 'Business': {
                plan = 'Business';
                credits = 500;
                amount = 25;
                break;
            }
            default: {
                console.log('Invalid planId provided');
                return res.status(400).json({ success: false, message: 'Invalid planId' });
            }
        }

        const date = Date.now();

        // Create transaction
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date,
        };
        console.log('Creating new transaction...');
        const newTransaction = await transactionModel.create(transactionData);

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Convert to smallest currency unit
            currency: process.env.CURRENCY || 'INR',
            receipt: String(newTransaction._id), // Ensure it's a string
        };

        console.log('Creating Razorpay order...');
        const order = await razorpayInstance.orders.create(options);

        // Send response
        res.json({ success: true, order });
    } catch (error) {
        console.error('Error occurred:', error.message || error);
        res.status(500).json({ success: false, message: 'An internal server error occurred', error: error.message });
    }
};







// API Controller function to verify razorpay function 




const verifyRazorpay = async(req,res) => {
    try {
        const {razorpay_order_id} = req.body 

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success:false, message:"Payment Failed!"})
            }

            // adding credits in user data
            const userData = await userModel.findOne({clerkId:transactionData.clerkId})
            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id,{creditBalance})

            // making the payment paid 
            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})

            res.json({success:true,message:"Credits Added!"})
        }


    } catch (error) {
        console.log(error);
		res.json({ success: false, message: "error on razorpay" });
    }
}


  

export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay };


