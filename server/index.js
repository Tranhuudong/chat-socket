import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

//middleware setup
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/upload/profile", express.static("upload/profile"))

app.use(cookieParser());
app.use(express.json());

// Routes 
app.use("/api/auth", authRoutes);


const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// setup monggodb

mongoose
  .connect(databaseURL)
  .then(() => console.log("DB Conection Successfull"))
  .catch((err) => console.log(err.message));
