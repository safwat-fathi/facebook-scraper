import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ValidationError, body, validationResult } from "express-validator";
import { HttpError } from "@/lib/classes/errors/http";
import { asyncHandler } from "@/api/middlewares/async.middleware";

import { SheetsService } from "@/services/sheets.services";
import { SheetRow } from "@/types/sheets";

dotenv.config();

const sheetsService = SheetsService.Instance();

// * Index
// * ----------
export const index = asyncHandler(async (_, res: Response) => {
  return res.status(200).json({
    success: true,
    message: res.__("sheet-load-success"),
  });
});

export const add = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, storeName, storeLinks, email, phone, notes } =
      req.body as SheetRow;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsMapped = errors.array().map((err: any) => ({
        type: err.type,
        path: err.path,
        message: err.msg,
      }));

      return next(new HttpError(400, res.__("row-add-failed"), errorsMapped));
    }

    // add row in google sheet
    await sheetsService.addRow({
      name,
      email,
      phone,
      storeName,
      storeLinks,
      notes,
    });

    return res.status(200).json({
      success: true,
      message: res.__("row-add-success"),
    });
  }
);
