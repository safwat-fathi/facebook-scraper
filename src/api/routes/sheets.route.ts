import { Router } from "express";
import { index, add } from "@/api/controllers/sheets.controller";
import {
  validateEmail,
  validateName,
  validatePhone,
  validateStoreLinks,
  validateStoreName,
} from "../middlewares/sheets.middlware";

const sheets = Router();

// * Get all
sheets.get("/", index);

// * Add row
sheets.post(
  "/add",
  validateEmail,
  validateName,
  validatePhone,
  validateStoreLinks,
  validateStoreName,
  add
);

export default sheets;
