const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path =require('path')
// create express app
const app = express();
app.use(cors());
// Setup server port
const port = process.env.PORT || 4000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())



// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});
app.use('/images',express.static('images'))

// define a root/default route
app.get('/', (req, res) => {
    res.json({ "message": "Hello World" });
});

// Require Account routes
const accountRoutes = require('./routes/account.routes');
// using as middleware
app.use('/api/account', accountRoutes)

// Require Users routes
const userRoutes = require('./routes/user.routes');
// using as middleware
app.use('/api/user', userRoutes);

// Require Resume routes
const profileRoutes = require('./routes/profile.routes');
// using as middleware
app.use('/api/profile', profileRoutes)

// Require Person routes
const personRoutes = require('./routes/person.routes');
// using as middleware
app.use('/api/person', personRoutes)

// Require Contact routes
const contactRoutes = require('./routes/contact.routes');
// using as middleware
app.use('/api/contact', contactRoutes)

// Require Skill routes
const skillRoutes = require('./routes/skill.routes');
// using as middleware
app.use('/api/skill', skillRoutes)

// Require Job routes
const jobRoutes = require('./routes/job.routes');
// using as middleware
app.use('/api/job', jobRoutes)

// Require Employment routes
const employmentRoutes = require('./routes/employment.routes');
// using as middleware
app.use('/api/employment', employmentRoutes)

// Require Company routes
const companyRoutes = require('./routes/company.routes');
// using as middleware
app.use('/api/company', companyRoutes)

// Require Date routes
const dateRoutes = require('./routes/date.routes');
// using as middleware
app.use('/api/date', dateRoutes);

// Require Award routes
const awardRoutes = require('./routes/award.routes');
// using as middleware
app.use('/api/award', awardRoutes);

// Require Education routes
const educationRoutes = require('./routes/education.routes');
// using as middleware
app.use('/api/education', educationRoutes);

// Require Course routes
const courseRoutes = require('./routes/course.routes');
// using as middleware
app.use('/api/course', courseRoutes);

// Require Character Reference routes
const characterReferenceRoutes = require('./routes/characterReference.routes');
// using as middleware
app.use('/api/character_reference', characterReferenceRoutes);

// Require Picture Reference routes
const pictureRoutes = require('./routes/picture.routes');
// using as middleware
app.use('/api/picture', pictureRoutes);

// listen for requests
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});