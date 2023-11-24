import User from "../models/User.js";
import Med from "../models/Med.js";
import { StatusCodes } from "http-status-codes";
import schedule from "node-schedule";
import { sendReminderEmail } from "../config/send-email.js";

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
  res.send("fetchmeds");
};

const fetchMed = async (req, res) => {
  res.send("fetchmed");
};

const updateMed = async (req, res) => {
  res.send("update");
};

const deleteMed = async (req, res) => {
  res.send("delete");
};

export { addMed, fetchAllMeds, fetchMed, updateMed, deleteMed };
