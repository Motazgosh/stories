const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Include route handlers
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

const homepageRouter = require('./routes/homepage');
const storiesviewerRouter = require('./routes/storiesviewer');
const aboutusRouter = require('./routes/aboutus')

// Routes
app.use('/', loginRouter);
app.use('/', signupRouter);
// Use homepage router for the homepage route
app.use('/', homepageRouter);
app.use('/', storiesviewerRouter);
app.use('/', aboutusRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
