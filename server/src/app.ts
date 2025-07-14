import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/auth.routes"

dotenv.config();
connectDB();
console.log("mongo db conected");

const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  CLIENT_URL,
];
 
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



app.use("/api/auth", authRoutes);


app.use(errorHandler);

export default app;