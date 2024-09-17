const { registerVehicleServices } = require("../services/apiServices");

exports.registerVehicleController = async (req, res, next) => {
    try {
        console.log("Request parameters in register new vehicle controller:--", req.body);
        const data = await registerVehicleServices(req);
        console.log("Response parameters in register new vehicle controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in register new vehicle controller:--", error);
        next(error);
    }
};
