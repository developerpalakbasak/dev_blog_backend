import EmailModel from "../models/EmailModel.js";
import validator from "validator"

// Create blog
export const subscribeEmail = async (req, res) => {
    try {
        // console.log(req.body)

        const { email } = req.body;

        const isValidEmail = (validator.isEmail(email));


        if (!isValidEmail) {
            return res.status(400).json({ error: "Email must be valid" });
        }
        if (!email) {
            return res.status(400).json({ error: "Email field are required" });
        }
        console.log("Email Response:", email);


        // Prepare data
        const emailData = {
            email
        };

        const isExists = await EmailModel.findOne(emailData);
        // console.log(isExists)
        if (isExists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Save the data to the database
        const newSubscriber = await EmailModel.create(emailData);

        console.log("Subscribed successfully");

        res.status(201).json({
            success: true,
            message: "Subscribed successfully",
            newSubscriber,
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Blog creation failed",
        });
    }
};
