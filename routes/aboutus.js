const express = require('express');
const { resolve } = require("path");
const {db} = require("./firebase");
const router = express.Router();

router.get('/aboutus', (req, res) => {
    res.sendFile(resolve('./views/aboutus.html'));
});

module.exports = router;
