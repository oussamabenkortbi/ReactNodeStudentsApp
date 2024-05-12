import express from "express";

import studentsRouter from "./students-rt.js";

const router = express.Router();

router.use("/students", studentsRouter);

export default router;
