import User from "../models/User.js";
import { BadRequestError } from "../errors/index.js";

const fetchUser = async (req, res) => {
  const patients = await User.find({ role: "patient" });

  if (!patients) {
    throw new BadRequestError("No registered patients");
  }

  res.json({ status: "success", msg: patients });
};

export { fetchUser };
