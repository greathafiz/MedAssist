import "dotenv/config";
import { fileURLToPath } from "url";
import * as path from "path";
import 'express-async-errors'
import express from "express";
import connectDB from "./config/db.js";
import verifyUser from "./middleware/verifyUser.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import helmet from "helmet";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { medRouter } from "./routes/med.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
const app = express();

// Security packages
app.use(cors());
app.use(helmet());

// app.use(express.static(path.resolve(__dirname, '..', './frontend/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Other code goes here...

// Routes

app.use("/api/v1", authRouter);
app.use("/api/v1/med", verifyUser, medRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = 3000 || process.env.PORT;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
