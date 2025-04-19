import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';
import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();


const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only true for HTTPS
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
        return res.status(400).json({ message: "Provide all fields" });
    }
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
   
      generateToken(res, user._id);
      res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/logout', (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        console.log("Error in signout", error.message);
        res.status(500).json({ message: "Internal server error" });
    }  
});

router.get('/check', protectRoute, (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkauth", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;

