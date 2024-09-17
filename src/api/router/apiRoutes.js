const express = require('express');
const router = express.Router();

const validatorResponse = require("../../utility/joiValidator");
const { registerVehicleSchema } = require('../validationSchema/apiValidationSchema');
const { registerVehicleController } = require('../controllers/apiController');

router.post('/vehicles/register', validatorResponse(registerVehicleSchema), registerVehicleController);

module.exports = router;
