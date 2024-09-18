const express = require('express');
const router = express.Router();

const validatorResponse = require("../../utility/joiValidator");
const { registerVehicleSchema, purchasePassSchema, availableSlotSchema, releaseSlotSchema } = require('../validationSchema/apiValidationSchema');
const { registerVehicleController, vehicleListController, vehiclePassController, purchasePassController, purchasePassListController, availableSlotController, bookedSlotListController, releaseSlotController } = require('../controllers/apiController');

router.post('/register', validatorResponse(registerVehicleSchema), registerVehicleController);
router.get('/vehicles-list', vehicleListController);

router.get('/pass-rates', vehiclePassController);
router.post('/purchase-pass', validatorResponse(purchasePassSchema), purchasePassController);
router.get('/purchase-pass-list', purchasePassListController);

router.get('/booked-parking-slot-list', bookedSlotListController);
router.post('/book-available-slot', validatorResponse(availableSlotSchema), availableSlotController);
router.post('/release-slot', validatorResponse(releaseSlotSchema), releaseSlotController);

module.exports = router;
