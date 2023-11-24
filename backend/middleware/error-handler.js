import { CustomHttpError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomHttpError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again later" });
};

export default errorHandlerMiddleware;
