const Joi = require('joi');
const vehicleTypes = ['cycle', 'motorcycle', 'car'];
const passTypes = ['day_pass', 'week_pass', 'monthly_pass'];

exports.registerVehicleSchema = Joi.object({
    owner_name: Joi.string().min(3).max(40).required().messages({
        'string.base': 'Owner name should be a type of text',
        'string.empty': 'Owner name cannot be empty',
        'string.min': 'Owner name should have at least 3 characters',
        'string.max': 'Owner name should have at most 40 characters',
        'any.required': 'Owner name is required'
    }),

    phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
        'string.pattern.base': 'Phone number must be a 10-digit number',
        'string.empty': 'Phone number cannot be empty',
        'any.required': 'Phone number is required'
    }),

    vehicle_type: Joi.string().valid(...vehicleTypes).required().messages({
        'any.only': 'Vehicle type must be either cycle, motorcycle, or car',
        'string.empty': 'Vehicle type cannot be empty',
        'any.required': 'Vehicle type is required'
    }),

    vehicle_number: Joi.string().pattern(new RegExp('^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$')).required().messages({
        'string.pattern.base': 'Vehicle number must be in the format XX-00-XX-0000 (e.g., MH-01-RS-1234)',
        'string.empty': 'Vehicle number cannot be empty',
        'any.required': 'Vehicle number is required'
    })
});

exports.purchasePassSchema = Joi.object({
    vehicle_type: Joi.string().valid(...vehicleTypes).required().messages({
        'any.only': 'Vehicle type must be either cycle, motorcycle, or car',
        'string.empty': 'Vehicle type cannot be empty',
        'any.required': 'Vehicle type is required'
    }),

    days: Joi.number().required().messages({
        'any.only': 'Pass type must be either day, week or month',
        'string.empty': 'Vehicle type cannot be empty',
        'any.required': 'Vehicle type is required'
    }),

    vehicle_number: Joi.string().pattern(new RegExp('^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$')).required().messages({
        'string.pattern.base': 'Vehicle number must be in the format XX-00-XX-0000 (e.g., MH-01-RS-1234)',
        'string.empty': 'Vehicle number cannot be empty',
        'any.required': 'Vehicle number is required'
    })
});

exports.availableSlotSchema = Joi.object({
    vehicle_type: Joi.string().valid(...vehicleTypes).required().messages({
        'any.only': 'Vehicle type must be either cycle, motorcycle, or car',
        'string.empty': 'Vehicle type cannot be empty',
        'any.required': 'Vehicle type is required'
    }),

    vehicle_number: Joi.string().pattern(new RegExp('^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$')).required().messages({
        'string.pattern.base': 'Vehicle number must be in the format XX-00-XX-0000 (e.g., MH-01-RS-1234)',
        'string.empty': 'Vehicle number cannot be empty',
        'any.required': 'Vehicle number is required'
    })
});

exports.releaseSlotSchema = Joi.object({
    slot_id: Joi.string().required().messages({
        'string.empty': 'Slot Id cannot be empty',
        'any.required': 'Slot Id is required'
    })
});
