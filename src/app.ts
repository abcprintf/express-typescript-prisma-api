import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import morganMiddleware from "./config/morganMiddleware";
import apiAuthRouters from "./routes/api/auth";

const app: Express = express();
const port = process.env.APP_PORT;

/**
 * init Logger
 */
app.use(morganMiddleware);

/**
 * init routers
 */
app.use("/api/auth", apiAuthRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript + Prisma Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
