import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import morganMiddleware from "./config/morganMiddleware";
import apiAuthRouters from "./routes/api/auth";
import path from "path";

const app: Express = express();
const port = process.env.APP_PORT;

/**
 * init Logger
 */
app.use(morganMiddleware);

/**
 * static files
 */
app.use(express.static(path.join(__dirname, "../public")));

/**
 * init routers
 */
app.use("/api/auth", apiAuthRouters);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/../public/index.html");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
