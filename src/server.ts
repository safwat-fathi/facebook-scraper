import dotenv from "dotenv";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";
import helmet from "helmet";

import { errorHandler } from "@/api/middlewares/error.middleware";
import i18n from "@/config/i18n.config";

// routes
import routes from "@/api/routes";
import path from "path";

dotenv.config();

const app: Express = express();

// remove X-Powered-By header in ExpressJS
app.disable("x-powered-by");

const PORT = <number>process.env.HTTP_SERVER_PORT || 8000;

// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// compress
app.use(compression());

// cors policy
app.use(cors());
app.options("*", cors());

// parse json body requests
app.use(express.json());

// prevent param pollution
app.use(hpp());

// security headers
app.use(helmet());

// use cookie-parser so server can access the necessary option to save, read and access a cookie
app.use(cookieParser());

// i18n
app.use(i18n.init);

// routes
app.use("/api", routes);

// static paths
app.use("/api/files", express.static(path.join(__dirname, "../uploads")));

// error handler middleware
if (process.env.NODE_ENV === "development") app.use(errorHandler);

// fix issue parsing query params array limit
// app.set("query parser", function (str: string) {
//   return qs.parse(str, { arrayLimit: 1000 });
// });

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at ${PORT}`);
});

// exceptions handlers
process.on("uncaughtException", error => {
  console.log("Server::uncaughtException::", error);
  process.exit(1); // exit application
});

process.on("unhandledRejection", (error, promise) => {
  console.log("Server::unhandledRejection::promise", promise);
  console.log("Server::unhandledRejection::error", error);
  process.exit(1); // exit application
});

process.on("SIGTERM", error => {
  console.log("Server::SIGTERM", error);
  process.exit(0); // exit application
});

process.on("SIGINT", error => {
  console.log("Server::SIGINT", error);
  process.exit(0); // exit application
});

export default app;
