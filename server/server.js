const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB configuration
const MONGO_URI = 'mongodb://localhost:27017/notes-app';

// Improved connection settings
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Disable command buffering globally
mongoose.set('bufferCommands', false);

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Request Body:", req.body); 
    let missingFields = [];

    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length) {
        return res.status(400).json({ msg: `Please enter all fields. Missing: ${missingFields.join(', ')}` });
    }

    try {
        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        
        res.json({
            success: true,
            user: {
                id: savedUser.id,
                username: savedUser.username
            }
        });
    } catch(err) {
        res.status(400).json({ success: false, msg: 'Error processing request', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
