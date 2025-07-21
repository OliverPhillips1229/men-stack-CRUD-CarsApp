require('dotenv').config();

// Import packages
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); // Allows us to use PUT and DELETE methods

// Import Car model
const Car = require('./models/Car');

// Initialize Express app
const app = express();

// ----------- Middleware -----------
// Parse form data (from POST requests)
app.use(express.urlencoded({ extended: true }));

// Allow HTML forms to simulate PUT/DELETE 
app.use(methodOverride('_method'));

// Serve static files from the public folder
app.use(express.static('public'));

// Set EJS as the view engine 
app.set('view engine', 'ejs');

// ---------- Database Connection ----------
// Connect to MongoDB using Mongoose
mongoose.connection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Confirm connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// ---------- Routes ----------
// Home route
app.get('/', (req, res) => {
    res.render('index');
});

