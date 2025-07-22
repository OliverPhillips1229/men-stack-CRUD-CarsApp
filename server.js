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
// not needed, if you are rendering index.ejs dont need this!
// uses index, instead of index.ejs 

// ---------- Database Connection ----------
// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI);

// Confirm connection
// only connects ONE TIME
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// use this instead!
// consistantly checking the DB
// mongoose.connect.on('connected', () => {
//  console.log('Connected to MongoDB');
// });

// ---------- Routes ----------
// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// INDEX ROUTE - Show all cars
app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all cars from DB
        res.render('cars/index', { cars }); // Render them
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// NEW ROUTE - Show form to create a new car
app.get('/cars/new', (req, res) => {
    res.render('cars/new'); // Just renders the form
});

// CREATE ROUTE - Add a new car to the database
app.post('/cars', async (req, res) => {
  try {
    // Checkbox sends "on" if checked, so convert it to boolean
    req.body.isAvailable = req.body.isAvailable === 'on';

    await Car.create(req.body); // Create new car with form data
    res.redirect('/cars');      // Redirect to index page
  } catch (err) {
    console.error(err);
    res.send('Error creating car');
  }
});

// SHOW ROUTE - Show details of one car
app.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id); // Find car by ID
    res.render('cars/show', { car });              // Render the show view
  } catch (err) {
    console.error(err);
    res.send('Error showing car details');
  }
});

// EDIT ROUTE - Show form to edit an existing car
app.get('/cars/:id/edit', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('cars/edit', { car });
  } catch (err) {
    console.error(err);
    res.send('Error loading edit form');
  }
});

// UPDATE ROUTE - Handle form submission for updating a car
app.put('/cars/:id', async (req, res) => {
  try {
    req.body.isAvailable = req.body.isAvailable === 'on';
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/cars/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send('Error updating car');
  }
});

// DELETE ROUTE - Delete a car
app.delete('/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
  } catch (err) {
    console.error(err);
    res.send('Error deleting car');
  }
});

// ---------- Start Server ----------

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});