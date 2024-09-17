const Joi = require('joi');

exports.registerVehicleSchema = Joi.object({
    owner_name: Joi.string().required(),
    phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    vehicle_type: Joi.string().valid('cycle', 'motorcycle', 'car').required(),
    vehicle_number: Joi.string().pattern(new RegExp('^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$')).required(),
});
