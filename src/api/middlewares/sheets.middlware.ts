import { body } from "express-validator";

// express validators
export const validateName = body("name")
  .exists()
  .bail()
  .withMessage("Name is required")
  .trim()
  .escape();

export const validatePhone = body("phone")
  .not()
  .isEmpty()
  .bail()
  .withMessage("Phone is required")
  .matches(/\d{3}\s?\d{4}-?\d{4}/gm)
  .withMessage("Phone is not valid egyptian mobile number")
  .bail()
  .trim()
  .escape();

export const validateStoreName = body("storeName")
  .exists()
  .bail()
  .withMessage("Store name is required")
  .trim()
  .escape();

export const validateNotes = body("notes").optional().trim().escape();

export const validateStoreLinks = body("storeLinks")
  .exists()
  .bail()
  .withMessage("Store links is required")
  .trim()
  .escape();

export const validateEmail = body("email")
  .exists()
  .withMessage("Email is required")
  .bail()
  .isEmail()
  .withMessage("Invalid email")
  .bail()
  .normalizeEmail()
  .trim()
  .escape();

export const required = (n: string) =>
  body(n).exists().withMessage(`${n} is required`);
