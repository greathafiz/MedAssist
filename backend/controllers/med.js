import User from "../models/User.js";
import Med from "../models/Med.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import schedule from "node-schedule";
import {
  sendReminderEmail,
  sendAdherenceReport,
} from "../utils/send-email.js";
import { generatePDF } from "../utils/generate-pdf.js";

const addMed = async (req, res) => {
  const { medicationName, frequency, reminders } = req.body;

  let newMed = new Med({
    patientId: req.user.userId,
    medicationName: medicationName,
    frequency: frequency,
    reminders: reminders,
  });
  newMed.save();

  const user = await User.findById(req.user.userId);
  user.medication.push(newMed._id);
  await user.save();

  // schedule email reminders once medication is added
  newMed.reminders.forEach((reminder) => {
    const [hour, minute] = reminder.split(":");
    const rule = new schedule.RecurrenceRule();
    rule.hour = parseInt(hour, 10);
    rule.minute = parseInt(minute, 10);

    schedule.scheduleJob(rule, async () => {
      const emailSubj = "Medication Reminder";
      const emailText = `It's time to take your medication: ${newMed.medicationName}`;

      await sendReminderEmail(user.email, emailSubj, emailText);

      console.log(
        `Reminder for medication ${newMed.medicationName} sent to ${user.email} at ${reminder}`
      );
    });
  });

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", msg: "Medication added successfully" });
};

const fetchAllMeds = async (req, res) => {
  // Common information for both patients and doctors
  const commonData = {
    userRole: req.user.role,
    userId: req.user.userId,
  };

  const { medicationName, dosage, adherenceStatus } = req.query;

  let query = {}

  if (req.user.role === 'patient') {
    query = {patientId: req.user.userId}; // will have to also filter by 'patientId: req.user.userId' if there's a patient - doctor mapping
  }

  if (adherenceStatus) {
    query.adherenceStatus = adherenceStatus;
  }

  if (dosage) {
    query.dosage = dosage;
  }

  if (medicationName) {
    query.medicationName = new RegExp(medicationName, "i");
  }

  // if (req.user.role === "patient") {
  // Dashboard data for patients
  const activeMeds = await Med.find(query);

  if (activeMeds.length === 0) {
    // Handle the case of an empty dashboard
    return res.json({
      ...commonData,
      msg: "No medication adherence data available.",
    });
  }

  // Calculate percentage adherence and include other data
  const totalMeds = activeMeds.length;
  const takenMeds = activeMeds.filter(
    (record) => record.adherenceStatus === "Taken"
  ).length;
  const missedMeds = activeMeds.filter(
    (record) => record.adherenceStatus === "Missed"
  ).length;
  const percentageAdherence = (
    totalMeds > 0 ? (takenMeds / totalMeds) * 100 : 100
  ).toFixed(2);

  return res.json({
    status: "success",
    msg: {
      ...commonData,
      totalMeds,
      takenMeds,
      missedMeds,
      percentageAdherence,
      activeMeds,
    },
  });
  /* } else if (req.user.role === "doctor") {
    // Dashboard data for doctors
    const assignedPatients = await User.find({
      assignedDoctor: req.user.userId,
    }); //.populate("medication");

    if (assignedPatients.length === 0) {
      // Handle the case of an empty dashboard
      return res.json({ ...commonData, message: "No assigned patients." });
    }
    return res.json({
      status: "success",
      msg: { ...commonData, assignedPatients },
    }); */
  // }

  // res
  //   .status(StatusCodes.BAD_REQUEST)
  //   .json({ status: "failed", msg: "Invalid user role" });
};

const fetchMed = async (req, res) => {
  const { id: medicationId } = req.params;

  const medication = await Med.findOne({ _id: medicationId });

  if (!medication) {
    throw new NotFoundError(`There's no medication with id: ${medicationId}`);
  }
  res.json({ status: "success", msg: medication });
};

const updateMed = async (req, res) => {
  const { id: medicationId } = req.params;

  const medication = await Med.findOneAndUpdate(
    { _id: medicationId },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!medication) {
    throw new NotFoundError(`There's no medication with id: ${medicationId}`);
  }
  res.json({ status: "success", message: "Successfully updated" });
};

const deleteMed = async (req, res) => {
  const { id: medicationId } = req.params;

  const medication = await Med.findOneAndDelete({
    _id: medicationId,
  });
  if (!medication) {
    throw new NotFoundError(`There's no medication with id: ${medicationId}`);
  }
  res.json({ status: "success", message: "Medication deleted" });
};

const exportReport = async (req, res) => {
  const user = await User.findById(req.user.userId);
  try {
    await generatePDF(
      process.env.REPORT_PAGE,
      process.env.PDF_PATH
    );

    const emailSubj = "Adherence Report";
    const emailText = `Please find your requested adherence report attached`;

    await sendAdherenceReport(
      process.env.PDF_PATH,
      user.email,
      emailSubj,
      emailText
    );
    console.log(`Adherence report sent`);
  } catch (error) {
    console.error(error);
  }

  res.json({
    status: "success",
    msg: `Adherence report generated and sent to user's email`,
  });
};

export { addMed, fetchAllMeds, fetchMed, updateMed, deleteMed, exportReport };
