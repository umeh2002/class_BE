import express, { Application } from "express";
import db from "./Config/db";
import main from "./main";
import env from "dotenv";
env.config();

const realPort = parseInt(process.env.PORT!);
const port: number = realPort;

const app: Application = express();
main(app);

const server = app.listen(process.env.PORT || port, () => {
  console.log("");
  db();
  console.log(`server is running on port ${port}`);
});

process.on("uncaughtException", (error: any) => {
  console.log("server is shutting down due to uncaught exception");
  console.log(error);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("server is shutting down due to unhandled rejection");
  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});
