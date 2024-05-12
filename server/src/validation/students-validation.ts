import { body } from "express-validator";

export const bodyValidation = [
  body("id").isUUID().withMessage("Invalid id"),
  body("fullname").isString().withMessage("Invalid fullname"),
  body("subjects").isArray().withMessage("Invalid subjects"),
  body("birthdate").isDate().withMessage("Invalid birthdate"),
  body("status").matches(/^(paid|waiting|expired)$/).withMessage("Invalid status"),
];

export const idValidation = [body("id").isUUID().withMessage("id")];
