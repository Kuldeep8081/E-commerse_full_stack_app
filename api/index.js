const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://hacker_kuldeep:Kuldeep%40%23%24123@cluster0.mxjstue.mongodb.net/", {})
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the server after successful MongoDB connection
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

const User = require("./models/user");
const Order = require("./models/order");

// Function to send the verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    // Create a nodemailer transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kuldeep15072003kumar@gmail.com",
            pass: "knzw pshy sqrr esxn"
        }
    });

    // Compose the email message
    const mailOptions = {
        from: "marriagefurniture.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://192.168.207.46:8000/verify/${verificationToken}`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
};

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new user
        const newUser = new User({ name, email, password });

        // Generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        // Save the user to the database
        await newUser.save();

        // Send the verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(200).json({ message: "User registered successfully. Please check your email to verify your account." });
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: "Registering failed" });
    }
});

app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        // Find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log("Error verifying email", error);
        res.status(500).json({ message: "Email verification failed" });
    }
});


//end point to login to the user
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
}

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the password is incorrect
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});


//endpoint to store a new address to the backend

app.post("/addresses",async(req,res)=>{
    try{
        const {userId,address}=req.body;

        //find the user by the Userid

        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        //add the new address to the user's addresses array
        user.addresses.push(address);

        //save the updated user in the backed
        await user.save();

        res.status(200).json({message:"Address created Sucessfully"});
    }catch(error){
        res.status(500).json({message:"Error adding address"});
    }
})

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId",async(req,res)=>{
    try{
        const userId=req.params.userId;
        const user=await User.findById(userId);
        if(!user)
            return res.status(404).json({message:"User not found"});

        const addresses=user.addresses;
        res.status(200).json({addresses});
    }catch(error)
    {
        res.status(500).json({message:"Error retrieving the address"})
    }
})