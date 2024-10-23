import { Webhook } from "svix";
import userModel from "../models/userModel.js";

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

export { clerkWebhooks, userCredits };


