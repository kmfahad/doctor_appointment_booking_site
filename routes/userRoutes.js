const express = require('express');
const { loginController, 
    registerController, 
    authController, 
    applyDoctorController, 
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController
} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginController);

router.post("/register", registerController);

//Auth post
router.post('/getUserData', authMiddleware, authController)

//Apply doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController)



//Get all notification || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController)


//Delete notification || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)

// get all doctor
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//Book appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController)

router.post('/booking-availability', authMiddleware, bookingAvailabilityController )

//Appointments List
router.get('/user-appointments', authMiddleware, userAppointmentsController)
module.exports = router;