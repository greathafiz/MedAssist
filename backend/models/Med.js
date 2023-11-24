import mongoose from "mongoose";

const MedSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicationName: {
    type: String,
    required: [true, "Provide name of medication"],
  },
  dosage: {
    type: String,
  },
  frequency: {
    type: String,
    enum: [
      "Every day",
      "Specific days of the week",
      "Every X days",
      "Every X weeks",
      "Every X months",
      "Only as needed",
    ],
    required: true,
  },
  reminders: [
    {
      type: String,
      required: true,
    },
  ],
  adherenceStatus: {
    type: String,
    enum: ["Taken", "Missed"],
    required: true,
    default: "Missed",
  },
  stock: {
    type: Number,
    default: 1,
  },
  // When adherence record was created/updated.
  // It provides context to the adherence record by indicating when the patient marked their medication as taken or missed.
  // e.g. if a patient takes their medication at a specific time during the day,
  // the adherenceDate would reflect that moment.
  adherenceDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Med", MedSchema);
