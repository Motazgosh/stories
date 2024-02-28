const express = require('express');
const { resolve } = require("path");
const {db} = require("./firebase");
const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(resolve('./views/login.html'));
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            throw new Error('Email and password are required.');
        }

        // Query Firestore for a user with the provided email and password
        const userQuery = await db.collection('users').where('email', '==', email).where('password', '==', password).get();

        // If a user is found, send a welcome message
        if (!userQuery.empty) {
            // Accessing data from the first document in the query result
            const userData = userQuery.docs[0].data();
            const username = userData.name;
            res.sendFile(resolve('./views/homepage.html'));
        } else {
            res.send('Invalid email or password.');
        }
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).send('Error logging in.');
    }
});

module.exports = router;
