const express = require('express');
const { resolve } = require("path");
const {db} = require("./firebase");
const router = express.Router();



// Handle GET request to stories viewer route
router.get('/storiesviewer', async (req, res) => {
    try {
        // Fetch all stories from Firestore
        const storiesSnapshot = await db.collection('stories').get();

        // Array to hold story HTML elements
        const storyElements = [];

        // Iterate over each story document and create HTML elements
        storiesSnapshot.forEach((doc) => {
            const storyData = doc.data();
            const storyHtml = `
                <div class="story">
                    <h2>${storyData.event}</h2>
                    <p><strong>Date:</strong> ${storyData.date}</p>
                    <p><strong>Source:</strong> ${storyData.source || 'N/A'}</p>
                    <p><strong>Place:</strong> ${storyData.place || 'N/A'}</p>
                    <p><strong>Story:</strong></p>
                    <p>${storyData.text}</p>
                </div>
            `;
            storyElements.push(storyHtml);
        });

        // Join all story HTML elements into a single string
        const storiesHtml = storyElements.join('');

        // Send the HTML response with inline CSS
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Stories Viewer</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        margin: 0;
                        padding: 0;
                    }
                    header {
                        /*background-color: #222c22;*/
                        color: #4caf50;
                        padding: 20px;
                        text-align: center;
                    }
                    /*.header {*/
                    /*background-color: #222c22;*/
                    /*    color: #fff;*/
                    /*    padding: 20px;*/
                    /*    text-align: center;*/
                    /*}*/

                    .header a {
                        margin: 0 10px;
                        text-decoration: none;
                        color: #333;
                    }
                    main {
                        padding: 20px;
                    }
                    .story {
                        background-color: #fff;
                        padding: 20px;
                        margin-bottom: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center
                    }
                    .story h2 {
                        margin-top: 0;
                    }
                    footer {
                        background-color: #222c22;
                        color: #fff;
                        padding: 20px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <header>
                <div class="header">
                    <a href="/login">Log In</a>
                    <a href="/signup">Sign Up</a>
                    <a href="/homepage">Add Story</a>
                    <a href="/storiesviewer">Read Stories</a>
                    <a href="/aboutus">About Us</a>
                </div>
               <h1>Read Stories</h1>
               </header>
                <main>
                    ${storiesHtml}
                </main>
                <footer>
                    &copy; 2024 Our Website. All rights reserved.
                </footer>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching stories: ', error);
        res.status(500).send('Error fetching stories.');
    }
});

module.exports = router;