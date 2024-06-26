import { User } from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
const registerController = async (req, res) => {
    try {
        const {email, password } = req.body;
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required'
            });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).send({
                message: 'User Already Exists',
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({
            success: true,
            message: 'Registration completed successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Registration controller error: ${error.message}`
        });
    }
};

// Login
const loginController = async (req, res) => {
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user)
            {
                return res.status(200).send({message:`user not found`})
            }

        const isMatch=bcrypt.compare(req.body.password,user.password)
        if(!isMatch)
            {
                return res.status(200).send({message:'Invalid Email or Password',success:false})
            }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).send({
            message:'Login success',
            success:true,
            token
        })
    } catch (error) {
        console.log(error)
        res.send(500).send({
            message:`Error in login ${error.message}`
        })
    }
};

const authController =async(req,res)=>{
 try {
     const user =await User.findOne({_id:req.body.userId})
     if(!user)
        {
            return res.status(200).send({
                message:'user not found',
                success:false,
                error
            })
        }
        else{
            res.status(200).send({
                success:true,
                data:{
                    name:user.name,
                    email:user.email,
                }
            })
        }
 } catch (error) {
    console.log(error)
    res.ststus(500).send({
        message:'auth error',
        success:false,
    })
 }
}

export { loginController, registerController ,authController};
