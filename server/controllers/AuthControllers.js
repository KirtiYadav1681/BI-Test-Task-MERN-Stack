const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Registration Controller
module.exports.registerUser = async (req,res) => {
    try {
        const { name, email, phone, password } = req.body;
        if(!name || !email || !password || !phone) return res.send({success: false, message:"Fill all the details."})
        const userAlreadyExsists = await User.findOne({email: req.body.email});
        if(userAlreadyExsists) return res.send({success: false, message:"User already esxists."})
        else{
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.send({success: false, message:"Error hashing password."}); 
                else {
                    try {
                        const newUser = new User({name,email,password: hashedPassword,phone});
                        newUser.save();
                        return res.send({ success: true, message: "User Successfully Registered. Please Log in now." });   
                    } catch (error) {
                        return res.send({ success: false, message: "Error in saving user.", error });   
                    }
                }
            });
        }
    } catch (error) {
        return res.send({ message: "Internal server error in creating a new user", error})
    }  
};
const secret = process.env.JWT_SECRET || "thisismysecret";
// Login Controller
module.exports.loginUser = async (req,res) => {
    try {
        const userAlreadyExists = await User.findOne({ email: req.body.email });
        if(!userAlreadyExists) return res.send({success: false, message:"User not found, please register first."})
        else{
            const passwordMatched = await bcrypt.compare(req.body.password, userAlreadyExists.password);
            if(!passwordMatched) return res.status(400).send({success: false, message:"Invalid login credentials."})
            else{
                const token = jwt.sign({userId:userAlreadyExists._id},secret,{expiresIn: '1d'});
                return res.send({success: true,message:"Logged in successfully.", token});
            }
        }
    } catch (error) {
        return res.send({ success: false, message: "Internal server error in logging in a user", error})
    }
};