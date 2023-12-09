import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import morganMiddleware from "./config/morganMiddleware";
import apiAuthRouters from "./routes/api/auth";
import path from "path";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();
const PORT = process.env.APP_PORT;
const PUBLIC_PATH = path.join(__dirname, "../public");

const getCorsOptions = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      origin: process.env.API_BASE_URL,
    };
  }
  return undefined;
};

/**
 * init security modules
 */
app.use(
  helmet({
    contentSecurityPolicy: true,
  })
);
app.use(cors(getCorsOptions()));
app.use(express.json());

/**
 * init Logger
 */
app.use(morganMiddleware);

/**
 * static files
 * Serve Static files including the react app static bundle
 */
app.use(
  express.static(PUBLIC_PATH, {
    maxAge: 30 * 24 * 60 * 3600,
  })
);

/**
 * init routers
 */
app.use("/api/auth", apiAuthRouters);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(`${PUBLIC_PATH}/index.html`);
});

/**
 * not found handler
 */
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
