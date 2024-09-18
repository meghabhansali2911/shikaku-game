const { registerVehicleServices, vehicleListServices, vehiclePassServices, purchasePassServices, purchasePassListServices, availableSlotServices, bookedSlotListServices, releaseSlotServices } = require("../services/apiServices");

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

exports.vehicleListController = async (req, res, next) => {
    try {
        console.log("Request parameters in vehicle list controller:--", req.body);
        const data = await vehicleListServices(req);
        console.log("Response parameters in vehicle list controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in vehicle list controller:--", error);
        next(error);
    }
};

exports.vehiclePassController = async (req, res, next) => {
    try {
        console.log("Request parameters in vehicle pass controller:--", req.query);
        const data = await vehiclePassServices(req);
        console.log("Response parameters in vehicle pass controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in vehicle pass controller:--", error);
        next(error);
    }
};

exports.purchasePassController = async (req, res, next) => {
    try {
        console.log("Request parameters in vehicle purchase pass controller:--", req.query);
        const data = await purchasePassServices(req);
        console.log("Response parameters in vehicle purchase pass controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in vehicle purchase pass controller:--", error);
        next(error);
    }
};

exports.purchasePassListController = async (req, res, next) => {
    try {
        console.log("Request parameters in vehicle purchase pass List controller:--", req.query);
        const data = await purchasePassListServices(req);
        console.log("Response parameters in vehicle purchase pass List controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in vehicle purchase pass List controller:--", error);
        next(error);
    }
};


exports.availableSlotController = async (req, res, next) => {
    try {
        console.log("Request parameters in vehicle parking available slot controller:--", req.query);
        const data = await availableSlotServices(req);
        console.log("Response parameters in vehicle parking available slot controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in vehicle parking available slot controller:--", error);
        next(error);
    }
};

exports.bookedSlotListController = async (req, res, next) => {
    try {
        console.log("Request parameters in vehicle booked slot list controller:--", req.query);
        const data = await bookedSlotListServices(req);
        console.log("Response parameters in vehicle booked slot list controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in vehicle booked slot list controller:--", error);
        next(error);
    }
};

exports.releaseSlotController = async (req, res, next) => {
    try {
        console.log("Request parameters in vehicle release slot controller:--", req.query);
        const data = await releaseSlotServices(req);
        console.log("Response parameters in vehicle release slot controller:--", data);
        return res.send(data);
    } catch (error) {
        console.log("Error in vehicle release slot controller:--", error);
        next(error);
    }
};