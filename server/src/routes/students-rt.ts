import { Router } from "express";
import {
  createStudent,
  updateStudent,
  getStudents,
  getStudent,
  deleteStudent,
} from "../controllers/students-ct.js";

import isValid from "../middleware/is-valid.js";

import {
  bodyValidation,
  idValidation,
} from "../validation/students-validation.js";

const studentsRouter = Router();

studentsRouter.post(
  "/",
  bodyValidation,
  isValid,
  createStudent,
);

studentsRouter.put(
  "/",
  bodyValidation,
  isValid,
  updateStudent,
);

studentsRouter.get("/", getStudents);

studentsRouter.get("/:id", idValidation, isValid, getStudent);

studentsRouter.delete("/:id", idValidation, isValid, deleteStudent);

export default studentsRouter;
