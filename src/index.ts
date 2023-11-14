import "reflect-metadata";
import express, { Request, Response, Application } from "express";
import { config } from "./utils/config";
import Logging from "./utils/logging";
import mongoose from "mongoose";
import testRouter from "./routes/test";
import authRouter from "./routes/auth";

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is active!");
});

///// Routes
app.use("/test", testRouter);
app.use("/auth", authRouter);

///// Start Server
app.listen(config.port, async () => {
  const connected = await connectDatabase();
  if (connected) {
    Logging.info(`Server is running at port ${config.port}`);
  }
});

///// Connect to mongo
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongo, { retryWrites: true, w: "majority" });
    Logging.info("Connected to database");
    return true;
  } catch (error) {
    Logging.error(error);
    return false;
  }
};