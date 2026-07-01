import User from '../models/user.models.js'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


export const RegisterUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

       
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

      
        const user = await User.create({
            firstName: firstname,
            lastName: lastname,
            email,
            password 
        });

        
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user.id)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        res.status(200).json({
            message: 'User logged in successfully!',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user.id)
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};