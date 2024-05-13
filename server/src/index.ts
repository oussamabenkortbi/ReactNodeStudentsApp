import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import router from "./routes/index.js";

const app = express();

dotenv.config();

app
  .use(cors({ origin: "*" }))
  .use(bodyParser.json({ limit: "5mb" }))
  .use("/api/v1", express.json({ limit: "50mb" }), router)
  .use("*", (req: Request, res) => {
    res.status(404).json({ message: "You shouldn't be here" });
  })

app.get("/", (req: Request, res) => {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(process.env.PORT || 1337, () => {
  console.log(
    new Date().toLocaleTimeString() +
      `: Server is running on port ${process.env.PORT}...`,
  );
});
