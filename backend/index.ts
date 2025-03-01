import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import syncDatabase from "./config/databaseSync";
import userRoutes from "./routes/user_routes/userRoutes";
import dosageFormRoutes from "./routes/drug_routes/drugDosageFormRoutes";
import drugManufacturerRoutes from "./routes/drug_routes/drugManufacturerRoutes";
import drugRoutes from "./routes/drug_routes/drugRoutes";
import drugClassRoutes from "./routes/drug_routes/drugClassRoutes";
import modelAssociation from "./models/model_associations/modelAssociation";
const PORT = process.env.PORT || 8000;
const app: Application = express();

syncDatabase();
modelAssociation();
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
app.use("/dosage_form", dosageFormRoutes);
app.use("/drug_manufacturer", drugManufacturerRoutes);
app.use("/drugs", drugRoutes);
app.use("/drug_class", drugClassRoutes);

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
