import { UnauthorizedError } from "../errors/index.js";
import Blacklist from "../models/Blacklist.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new UnauthorizedError("Authentication failed. You are not authorized to access this route");
  }

  const token = req.headers.authorization.split(" ")[1];

  // check if user already logged out
  const checkIfBlacklisted = await Blacklist.findOne({ token: token });

  // if true, send an unauthorized message, asking to login again.
  if (checkIfBlacklisted)
    throw new UnauthorizedError("This session has expired. Kindly login again");
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    // console.log(req.user);
    next();
  } catch (error) {
    // console.error(error);
    throw new UnauthorizedError(
      `Authentication failed. You are not authorized to access this route`
    );
  }
};

export default verifyUser;