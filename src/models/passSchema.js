const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the vehicle schema
const passSchema = new Schema({
    vehicle_type: {
        type: String,
        required: true
    },
    vehicle_number: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: String,
        required: true
    },
    expiry_date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });

const VehiclePass = mongoose.model('vehicle_pass', passSchema);

module.exports = VehiclePass;
