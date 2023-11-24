import User from "../models/User.js";
import Med from "../models/Med.js";
import {StatusCodes} from 'http-status-codes'
// import dayjs from 'dayjs'

const addMed = async (req,res) => {
    
    let newMed = new Med({
        patientId: "6560539ea5a2cd2cdc0b7519",
        medicationName: "eyedrop 10ml",
        adherenceTimes: ['7am', '12pm']
    })
    newMed.save()
    
    const user = await User.findById(req.user.userId)
    user.medication.push(newMed._id)
    await user.save()
    // dayjs(newMed.adherenceDate).format('MMM DD HH:mmA')

    res.json({ newMed})
}

const fetchAllMeds = async (req,res) => {
    res.send('fetchmeds')
}

const fetchMed = async (req, res) => {
    res.send('fetchmed')
}

const updateMed = async (req,res) => {
    res.send('update')
}

const deleteMed = async (req,res) => {
    res.send('delete')
}

export {addMed, fetchAllMeds, fetchMed, updateMed, deleteMed}