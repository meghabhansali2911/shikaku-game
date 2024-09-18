const ParkingSlot = require("../../models/parkingSlotSchema");
const VehiclePass = require("../../models/passSchema");
const Vehicle = require("../../models/vehicleSchema");
const notification = require("../../utility/notification");

const pricing = {
    cycle: {
        day_pass: 20,
        week_pass: 100,
        month_pass: 350
    },
    motorcycle: {
        day_pass: 40,
        week_pass: 200,
        month_pass: 700
    },
    car: {
        day_pass: 60,
        week_pass: 300,
        month_pass: 1050
    }
};

exports.registerVehicleServices = async (req, res) => {
    try {
        const { owner_name, phone_number, vehicle_type, vehicle_number } = req.body;

        // Check if the vehicle number or phone number is already registered
        const check = await Vehicle.findOne({
            $and: [
                { vehicle_number: vehicle_number },
                { phone_number: phone_number }
            ]
        });

        if (check) {
            return {
                status: false,
                message: "Vehicle number already registered",
                data: {
                    vehicle_id: check._id,
                    owner_name: check.owner_name,
                    phone_number: check.phone_number,
                    vehicle_number: check.vehicle_number
                }
            };
        }

        // Register the new vehicle
        const vehicleData = await Vehicle.create({
            owner_name,
            phone_number,
            vehicle_type,
            vehicle_number
        });

        // Return success response
        return {
            status: true,
            message: "Vehicle registered successfully",
            data: {
                vehicle_id: vehicleData._id,
                owner_name: vehicleData.owner_name,
                phone_number: vehicleData.phone_number,
                vehicle_number: vehicleData.vehicle_number
            }
        };

    } catch (error) {
        console.error('An error occurred in registerVehicleServices:', error);

        // Return error response
        return {
            status: false,
            message: "An error occurred while registering the vehicle",
            data: {}
        };
    }
};
exports.vehicleListServices = async (req, res) => {
    try {
        // Fetch all vehicles from the database
        const vehicles = await Vehicle.aggregate([
            {
                $project: {
                    _id: 0,
                    vehicle_id: "$_id",
                    owner_name: 1,
                    vehicle_type: 1,
                    vehicle_number: 1,
                    phone_number: 1

                }
            }
        ]);

        return {
            status: true,
            message: !vehicles || vehicles.length === 0 ? "No vehicles found" : "Vehicle list retrieved successfully",
            data: vehicles
        };

    } catch (error) {
        console.error('An error occurred while fetching the vehicle list:', error);

        // Return error response with status code 500 for server error
        return {
            status: false,
            message: "An error occurred while retrieving the vehicle list",
            error: error.message || "Internal Server Error",
            data: []
        };
    }
};

exports.vehiclePassServices = async (req, res) => {
    try {
        const { days, vehicle_type } = req.query;

        if (!days || !vehicle_type || days <= 0) {
            return {
                status: false,
                message: days <= 0 ? "Please pass valid days" : "Vehicle pass pricing retrieved successfully",
                data: {}
            };
        }

        const amount = calculateAmount(days, vehicle_type);

        if (!amount || amount == 0) { throw new Error("Try after a while") }

        return {
            status: true,
            message: "Vehicle pass pricing retrieved successfully",
            data: {
                amount
            }
        }


    } catch (error) {
        console.error('An error occurred while fetching the vehicle list:', error);

        // Return error response with status code 500 for server error
        return {
            status: false,
            message: "An error occurred while retrieving the pass amount",
            data: {}
        };
    }
};

// Utility function to calculate amount based on days and vehicle type
function calculateAmount(days, vehicle_type) {
    try {

        const pricingForType = pricing[vehicle_type];
        let totalAmount = 0;

        const months = Math.floor(days / 30);
        days -= months * 30;
        totalAmount += months * Number(pricingForType.month_pass);

        const weeks = Math.floor(days / 7);
        days -= weeks * 7;
        totalAmount += weeks * Number(pricingForType.week_pass);

        totalAmount += days * Number(pricingForType.day_pass);

        return totalAmount;
    } catch (error) {
        console.error('An error occurred:', error);
        return 0;
    }
}

exports.purchasePassServices = async (req, res) => {
    try {
        const { days, vehicle_type, vehicle_number } = req.body;

        // Ensure 'days' is a positive number
        if (typeof days !== 'number' || days <= 0) {
            return {
                status: false,
                message: "Days must be a positive number",
                data: {}
            };
        }

        const amount = calculateAmount(days, vehicle_type) || 0;

        const current_date = new Date();
        const data = {
            vehicle_number,
            vehicle_type,
            days,
            amount,
            purchase_date: current_date,
            expiry_date: calculateExpiryDate(current_date, days) // Calculate expiry date based on days
        };

        const updatePassDetails = await VehiclePass.findOneAndUpdate(
            { vehicle_number },
            data,
            { new: true, upsert: true }
        );

        return {
            status: true,
            message: "Purchase Pass Successfully",
            data: updatePassDetails
        };

    } catch (error) {
        console.error('An error occurred while purchasing the pass:', error);
        return {
            status: false,
            message: "An error occurred while processing the purchase",
            data: {}
        };
    }
};

function calculateExpiryDate(current_date, days) {
    return new Date(current_date.getTime() + days * 24 * 60 * 60 * 1000);
}


exports.purchasePassListServices = async (req, res) => {
    try {

        const passList = await VehiclePass.aggregate([
            {
                $project: {
                    _id: 0,
                    vehicle_type: 1,
                    vehicle_number: 1,
                    days: 1,
                    purchase_date: 1,
                    expiry_date: 1,
                    amount: 1
                }
            }
        ]) || [];


        return {
            status: true,
            message: !passList || passList.length === 0 ? "No pass purchased yet " : "Purchase Pass list retrieved successfully",
            data: passList
        };

    } catch (error) {
        console.error('An error occurred while fetching the vehicle list:', error);

        // Return error response with status code 500 for server error
        return {
            status: false,
            message: "An error occurred while retrieving the pass amount",
            data: {}
        };
    }
};

exports.availableSlotServices = async (req, res) => {
    try {
        const { vehicle_type, vehicle_number } = req.body;

        const checkVehicleParked = await ParkingSlot.findOne({
            vehicle_type,
            vehicle_number,
            isOccupied: true
        });

        if (checkVehicleParked) {
            return {
                status: false,
                message: "Vehicle is already parked",
                data: {}
            };
        }

        const availableSlot = await ParkingSlot.findOne({
            vehicle_type,
            isOccupied: false
        });

        if (availableSlot) {
            availableSlot.vehicle_number = vehicle_number;
            availableSlot.isOccupied = true;
            availableSlot.parking_time = Date.now();
            await availableSlot.save();

            return {
                status: true,
                message: "Vehicle parked successfully.",
                data: {
                    id: availableSlot._id,
                    slot_number: availableSlot.slot_number,
                    vehicle_type: availableSlot.vehicle_type,
                    vehicle_number: availableSlot.vehicle_number,
                    parking_time: availableSlot.parking_time
                }
            };
        }

        const numSlotsToCreate = 5;
        const location = 'Lot-' + vehicle_type;

        const newSlots = Array.from({ length: numSlotsToCreate }, (_, i) => ({
            slot_number: `${location}-${i + 1}`,
            vehicle_type,
            vehicle_number: null,
            isOccupied: false
        }));

        const createdSlots = await ParkingSlot.insertMany(newSlots);
        const assignedSlot = createdSlots[0];

        assignedSlot.vehicle_number = vehicle_number;
        assignedSlot.isOccupied = true;
        assignedSlot.parking_time = Date.now();
        await assignedSlot.save();

        return {
            status: true,
            message: "No available slots found. New slots created and vehicle parked successfully.",
            data: {
                id: assignedSlot._id,
                slot_number: assignedSlot.slot_number,
                vehicle_type: assignedSlot.vehicle_type,
                vehicle_number: assignedSlot.vehicle_number,
                parking_time: assignedSlot.parking_time
            }
        };

    } catch (error) {
        console.error('An error occurred while processing the parking slot:', error);
        return {
            status: false,
            message: "An error occurred while retrieving available slots",
            data: {}
        };
    }
};

exports.bookedSlotListServices = async (req, res) => {
    try {
        const bookedSlots = await ParkingSlot.aggregate([
            {
                $match: {
                    isOccupied: true
                }
            },
            {
                $project: {
                    slot_id: '$_id', // Reference the original _id as slot_id
                    slot_number: 1,
                    vehicle_type: 1,
                    vehicle_number: 1,
                    parking_time: 1
                }
            }
        ]);


        return {
            status: true,
            message: "Booked slots retrieved successfully",
            data: bookedSlots
        };

    } catch (error) {
        console.error('An error occurred while fetching booked slots:', error);
        return {
            status: false,
            message: "An error occurred while retrieving booked slots",
            data: {}
        };
    }
};

exports.releaseSlotServices = async (req, res) => {
    try {
        const { slot_id } = req.body;
        const slot = await ParkingSlot.findById(slot_id)
        const check = await Vehicle.findOne({ vehicle_number: slot.vehicle_number });

        if (check) {
            notification(check.phone_number, "Slot released successfully");
        }

        slot.isOccupied = false;
        slot.vehicle_number = null;
        slot.vehicle_type = null;
        slot.parking_time = null;

        await slot.save();

        return {
            status: true,
            message: 'Slot released successfully',
            data: {}
        };

    } catch (error) {
        console.error('An error occurred while releasing booked slots:', error);
        return {
            status: false,
            message: 'Failed to release slot',
            data: {}
        };
    }
};
