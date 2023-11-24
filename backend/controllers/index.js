import User from "../models/User.js";
import Med from "../models/Med.js";
import { StatusCodes } from "http-status-codes";

const dashboardController = async (req, res) => {
  // Common information for both patients and doctors
  const commonData = {
    userRole: req.user.role,
    userId: req.user.userId,
  };

  if (req.user.role === "patient") {
    // Dashboard data for patients
    const patientMeds = await Med.find({ patientId: req.user.userId });

    if (patientMeds.length === 0) {
      // Handle the case of an empty dashboard
      return res.json({
        ...commonData,
        message: "No medication adherence data available.",
      });
    }

    // Calculate percentage adherence and include other data
    const totalMeds = patientMeds.length;
    const takenMeds = patientMeds.filter(
      (record) => record.adherenceStatus === "Taken"
    ).length;
    const missedMeds = patientMeds.filter(
      (record) => record.adherenceStatus === "Missed"
    ).length;
    const percentageAdherence = (
      totalMeds > 0 ? (takenMeds / totalMeds) * 100 : 100
    ).toFixed(2);

    return res.json({
      ...commonData,
      totalMeds,
      takenMeds,
      missedMeds,
      percentageAdherence,
      patientMeds,
    });
  } else if (req.user.role === "doctor") {
    // Dashboard data for doctors
    const assignedPatients = await User.find({
      assignedDoctor: req.user.userId,
    }).populate("medication");

    if (assignedPatients.length === 0) {
      // Handle the case of an empty dashboard
      return res.json({ ...commonData, message: "No assigned patients." });
    }

    // Include additional doctor-specific data as needed
    /* const doctorData = {
        assignedPatients,
        // Include additional doctor-specific data as needed
      }; */
    return res.json({ ...commonData, assignedPatients });
  }

  res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid user role" });
};

export { dashboardController };
