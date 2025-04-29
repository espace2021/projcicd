/* const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'ozella.zieme@ethereal.email',
    pass: 'E3yyaRmyPUZwbFVy5v'
  }
});

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role, avatar } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(404).send({ success: false, message: "Account already exists" });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hash,
    role,
    avatar,
    isActive: false
  });

  try {
    await newUser.save();

    // Send verification email
    const mailOption = {
      from: '"verify your email " <abcCorporation@gmail.com>',
      to: newUser.email,
      subject: 'Verification of your email',
      html: `<h2>${newUser.name}! Thank you for registering on our website</h2>
             <h4>Please verify your email to proceed...</h4>
             <a href="http://${req.headers.host}/api/users/status/edit?email=${newUser.email}">Click here</a>`
    };

    try {
      await transporter.sendMail(mailOption);
      console.log('Verification email sent to your  account');
    } catch (error) {
      console.log(error);
    }

    return res.status(201).send({ success: true, message: "Account created successfully", user: newUser });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// Email verification endpoint
router.get('/status/edit', async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    user.isActive = true;
    await user.save();

    res.send({ success: true, message: "Account activated successfully" });
  } catch (err) {
    return res.status(404).send({ success: false, message: err.message });
  }
});

// Admin toggle user activation
router.put('/status/edit', async (req, res) => {
  try {
    const { idUser } = req.body;
    const user = await User.findById(idUser).select('+isActive');

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).send({ success: true, user });
  } catch (err) {
    return res.status(404).send({ success: false, message: err.message });
  }
});

// Generate token
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.TOKEN, { expiresIn: '60s' });
};

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ success: false, message: "Account doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Please verify your credentials' });
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      token,
      refreshToken,
      user,
      isActive: user.isActive
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN, { expiresIn: '1y' });
};

router.post('/refreshToken', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(404).json({ success: false, message: 'Token Not Found' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(406).json({ success: false, message: 'Unauthorized Access' });
    }

    const token = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(200).json({
      token,
      refreshToken: newRefreshToken
    });
  });
});

// List users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
*/