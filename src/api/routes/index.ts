// * express
import { Router } from "express";
// * routes
import sheets from "./sheets.route";

const routes = Router();

routes.use("/sheets", sheets);

export default routes;
