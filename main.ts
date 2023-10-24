import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import auth from "./router/authRouter";

const main = (app: Application) => {
  app.use(express.json());
  app.use(cors());

  app.use(helmet());
  app.get("/", (req, res) => {
    try {
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error",
        data: error.message,
      });
    }
  });

  app.use("/api", auth);
};

export default main;
