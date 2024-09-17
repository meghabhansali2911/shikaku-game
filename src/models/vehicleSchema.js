const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the vehicle schema
const vehicleSchema = new Schema({
    owner_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    vehicle_type: {
        type: String,
        required: true
    },
    vehicle_number: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });
// Create a vehicle model using the schema
const vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = vehicle;
