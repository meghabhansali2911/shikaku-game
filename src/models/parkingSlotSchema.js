const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSlotSchema = new Schema({
    slot_number: {
        type: String,
        required: true
    },
    vehicle_type: {
        type: String,
    },
    vehicle_number: {
        type: String,
    },
    isOccupied: {
        type: Boolean,
        default: false
    },
    parking_time: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const ParkingSlot = mongoose.model('parking_slot', parkingSlotSchema);

module.exports = ParkingSlot;
