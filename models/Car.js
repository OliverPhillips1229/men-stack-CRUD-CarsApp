const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },          // e.g., Honda
    model: { type: String, required: true },         // e.g., Civic
    year: { type: Number, required: true },          // e.g., 2020
    color: String,                                   // e.g., Blue
    isAvailable: { type: Boolean, default: true }    // Available or not
});

// Create and export the Car model
const Car = mongoose.model('Car', carSchema);
module.exports = Car;
