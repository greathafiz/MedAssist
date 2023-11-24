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
});

export default mongoose.model("Med", MedSchema);
