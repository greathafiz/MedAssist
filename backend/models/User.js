import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, "Please provide your first name and last name"],
    maxlength: 25,
  },
  email: {
    type: String,
    unique: [true],
    match: [
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      "Please provide a valid email address",
    ],
    required: [true, "Please provide an email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["patient", "doctor"],
    required: true,
  },
  medication: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Med"
  }],
  // assignedDoctor: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   // Only required for patients
  //   // required: function () {
  //   //   return this.role === "patient";
  //   // },
  // },
});

UserSchema.method("generateJWT", function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFESPAN,
    }
  );
});

UserSchema.method("isPasswordCorrect", function (password) {
  return bcrypt.compareSync(password, this.password);
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", UserSchema);
