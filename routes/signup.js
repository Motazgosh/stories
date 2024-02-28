const express = require('express');
const {resolve} = require("path");
const {db} = require("./firebase");
const router = express.Router();

router.get('/signup', (req, res) => {
    res.sendFile(resolve( './views/signup.html'));
});

router.post('/signup', async (req, res) => {
    // Handle sign up logic here
    try {
        const { email, password, name } = req.body;

        console.log(email)

        // Add story data to Firestore
        const docRef = await db.collection('users').add({
            email: email,
            password: password,
            name: name
        });

        console.log('Document written with ID: ', docRef.id);
        alert('User added to Firestore successfully.')
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error adding user to Firestore.');
    }
});

module.exports = router;
