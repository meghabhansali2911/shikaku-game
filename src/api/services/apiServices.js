const Vehicle = require("../../models/vehicleSchema");

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
            const message = vehicle_number === check.vehicle_number
                ? "Vehicle number already registered"
                : "Phone number already registered";

            return {
                status: false,
                message,
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

