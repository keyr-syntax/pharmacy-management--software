import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import syncDatabase from "./config/databaseSync";
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT || 8000;
const app: Application = express();
syncDatabase();
app.use(express());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_PORT!,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use("/pharmacy_user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "The backend for Pharmacy App is working fine",
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error while starting server: ", error);
  } else {
    console.log(`Server is running on: http://localhost:${PORT}`);
  }
});
