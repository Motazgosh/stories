// homepage.js
const express = require("express");
const { resolve } = require("path");
const router = express.Router();
const fbase = require('./firebase');
const {db} = require('./firebase');


// Handle POST request to homepage route
router.post('/homepage', async (req, res) => {
    try {
        const { story_date, main_event, story_source, story_place, story_text } = req.body;

        console.log(story_date)

        // Add story data to Firestore
        const docRef = await db.collection('stories').add({
            date: story_date,
            event: main_event,
            source: story_source,
            place: story_place,
            text: story_text
        });

        console.log('Document written with ID: ', docRef.id);
        console.log('Story added to Firestore successfully.');
        res.sendFile(resolve('./views/homepage.html'));
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error adding story to Firestore.');
    }
});

// Serve homepage HTML file
router.get('/homepage', (req, res) => {
    res.sendFile(resolve('./views/homepage.html'));
});

module.exports = router;
