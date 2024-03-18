// import { readFile } from "fs/promises";
// import {
//   GoogleSpreadsheet,
//   GoogleSpreadsheetWorksheet,
// } from "google-spreadsheet";
// import path from "path";
// import dotenv from "dotenv";
// import { JWT } from "google-auth-library";

// import { SheetRow } from "@/types/sheets";

// dotenv.config();

// const { GOOGLE_SPREADSHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } =
//   process.env || {
//     GOOGLE_SPREADSHEET_ID: "",
//     GOOGLE_CLIENT_EMAIL: "",
//     GOOGLE_PRIVATE_KEY: "",
//   };

// const SCOPES = [
//   "https://www.googleapis.com/auth/spreadsheets",
//   "https://www.googleapis.com/auth/drive.file",
// ];

// // get sheet
// // read sheet & parse
// // update sheet

// export class SheetsService {
//   private static _instance: SheetsService;

//   private _doc: GoogleSpreadsheet | null = null;
//   private _sheet: GoogleSpreadsheetWorksheet | null = null;
//   private _sheetData: string | null = null;
//   private _sheetPath = path.join(
//     __dirname,
//     `../../storage/${GOOGLE_SPREADSHEET_ID}.csv`
//   );

//   // in constructor load doc
//   // or in init function load doc

//   private constructor() {
//     (async () => {
//       await this._init();
//     })();
//   }

//   public static Instance(): SheetsService {
//     if (!SheetsService._instance) {
//       SheetsService._instance = new SheetsService();
//     }

//     return SheetsService._instance;
//   }

//   private async _init() {
//     await this._loadDoc();
//     await this._loadSheet();
//   }

//   private async _loadDoc(): Promise<void> {
//     try {
//       // authenticate
//       const jwt = new JWT({
//         email: GOOGLE_CLIENT_EMAIL,
//         key: GOOGLE_PRIVATE_KEY,
//         scopes: SCOPES,
//       });

//       // fetch doc data
//       this._doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID, jwt);

//       await this._doc.loadInfo();
//     } catch (err) {
//       throw new Error(`SheetsService::loadDoc::${err}`);
//     }
//   }

//   private async _loadSheet(sheetIndex = 0): Promise<void> {
//     try {
//       if (this._doc) this._sheet = this._doc.sheetsByIndex[sheetIndex]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

//       // read doc data as CSV
//       // const csvBuffer = this._sheet && (await this._sheet.downloadAsCSV());

//       // write file to storage
//       // if (csvBuffer) await writeFile(this._sheetPath, Buffer.from(csvBuffer));
//     } catch (err) {
//       throw new Error(`SheetsService::loadSheet::${err}`);
//     }
//   }

//   async addRow(row: SheetRow): Promise<void> {
//     try {
//       const { email, name, phone, storeLinks, storeName, notes } = row;

//       if (this._sheet) {
//         const rowData = [name, email, phone, storeName, storeLinks];

//         if (notes?.length) rowData.push(notes);

//         await this._sheet.addRow(rowData);
//       } else throw new Error("SheetsService::addRow::no sheet found");
//     } catch (err) {
//       throw new Error(`SheetsService::addRow::${err}`);
//     }
//   }

//   public async readSheet(): Promise<string> {
//     try {
//       if (this._sheetData) return this._sheetData;

//       this._sheetData = await readFile(this._sheetPath, "utf-8");

//       return this._sheetData;
//     } catch (err) {
//       throw new Error(`SheetsService::readSheet::${err}`);
//     }
//   }
// }
