import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Express Configuration
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// Express Configuration

// Route Import
 import userRouter from "./routes/user.route.js"
// Route Import

// Route declaration
app.use("/api/v1/users", userRouter)
// Route declaration

export { app };
