"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const databaseSync_1 = __importDefault(require("./config/databaseSync"));
const userRoutes_1 = __importDefault(require("./routes/user_routes/userRoutes"));
const drugInventoryRoutes_1 = __importDefault(require("./routes/drug_routes/drugInventoryRoutes"));
const drugSupplierRoutes_1 = __importDefault(require("./routes/drug_routes/drugSupplierRoutes"));
const drugRoutes_1 = __importDefault(require("./routes/drug_routes/drugRoutes"));
const drugPricingRoutes_1 = __importDefault(require("./routes/drug_routes/drugPricingRoutes"));
const drugSafetyRoutes_1 = __importDefault(require("./routes/drug_routes/drugSafetyRoutes"));
const productConstantsRoute_1 = __importDefault(require("./routes/product_constants/productConstantsRoute"));
const modelAssociation_1 = __importDefault(require("./models/model_associations/modelAssociation"));
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
(0, databaseSync_1.default)();
(0, modelAssociation_1.default)();
app.use((0, express_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_PORT,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, cookie_parser_1.default)());
app.use("/pharmacy_user", userRoutes_1.default);
app.use("/drug_inventory", drugInventoryRoutes_1.default);
app.use("/drug_supplier", drugSupplierRoutes_1.default);
app.use("/drugs", drugRoutes_1.default);
app.use("/drug_pricing", drugPricingRoutes_1.default);
app.use("/drug_safety", drugSafetyRoutes_1.default);
app.use("/product_constants", productConstantsRoute_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "The backend for Pharmacy App is working fine",
    });
});
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error while starting server: ", error);
    }
    else {
        console.log(`Server is running on: http://localhost:${PORT}`);
    }
});
