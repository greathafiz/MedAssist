import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const signupController = async (req, res) => {
  const user = await User.create(req.body);
  const token = await user.generateJWT();
  res.status(StatusCodes.CREATED).json({ status: "success", msg: "User registration successful", user, token });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email && password) {
    throw new BadRequestError("Provide your registered email address");
  } else if (email && !password) {
    throw new BadRequestError("Enter your password");
  } else if (!email && !password) {
    throw new BadRequestError("Provide email address and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError(
      `Sorry. There's no user associated with the email address: ${email}`
    );
  }

  const passwordMatch = user.isPasswordCorrect(password);
  // console.log(passwordMatch);

  if (!passwordMatch) {
    throw new BadRequestError("Password is incorrect");
  }

  const token = user.generateJWT();
  res.json({ status: "success", msg: "Login was successful", user, token });
};

export { signupController, loginController };
