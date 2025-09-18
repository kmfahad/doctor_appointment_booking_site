const appointmentModel = require('../models/appointmentModel')
const doctorModel = require('../models/doctorModels')
const userModel = require('../models/userModels')
const getDoctorInfoController= async(req, res) =>{
    try{
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: 'doctor data fetch successfully',
            data: doctor
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error fetching in doctor details',
            error,

        })
    }

}

const updateProfileController = async(req, res) => {
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(201).send({
            success: true,
            message: 'Doctor profile updated',
            data: doctor
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Doctor profile update problem',
            error
        })
    }
}


//Get single doctor

const getDoctorByIdController = async(req, res) =>{
    try{
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success: true,
            message: 'Single doctor info',
            data: doctor
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Single doctor'
        })
    }
}


//Doctor appointments
const doctorAppointmentsController = async(req, res) =>{
   try{
    const doctor = await doctorModel.findOne({userId: req.body.userId})
    const appointments = await appointmentModel.find({doctorId: doctor._id})
    
    res.status(200).send({
        success: true,
        message: 'Doctor appointments Successfully',
        data: appointments,
    })
    } catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message: 'Error in Doctor appointments'

    })

   }
}



const updateStatusController = async(req, res) => {
    try {
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status})
        const user = await userModel.findOne({_id: appointments.userId})
        user.notification.push({
            type: 'Status Updated',
            message: `Your appointment has been updated ${status}`,
            onClickPath: '/doctor-appointments'
        })
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Appointment Status Updated'

        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Update Status'

        })
    }
}

module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController}