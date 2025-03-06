import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import syncDatabase from "./config/databaseSync";
import userRoutes from "./routes/user_routes/userRoutes";
import drugInventoryRoutes from "./routes/drug_routes/drugInventoryRoutes";
import drugSupplierRoutes from "./routes/drug_routes/drugSupplierRoutes";
import drugRoutes from "./routes/drug_routes/drugRoutes";
import drugPricingRoutes from "./routes/drug_routes/drugPricingRoutes";
import drugSafetyRoutes from "./routes/drug_routes/drugSafetyRoutes";
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
app.use("/drug_inventory", drugInventoryRoutes);
app.use("/drug_supplier", drugSupplierRoutes);
app.use("/drugs", drugRoutes);
app.use("/drug_pricing", drugPricingRoutes);
app.use("/drug_safety", drugSafetyRoutes);

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
