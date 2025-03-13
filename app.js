import express from "express";
import cors from "cors";
import path from "path";
import emailRouter from "./routes/emailRoutes.js";
import blogrouter from "./routes/blogRoutes.js";
import dotenv from "dotenv"



dotenv.config({path:".env"});
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Allow any origin for "/uploads"
app.use("/uploads", cors(), express.static(path.join(process.cwd(), "uploads")));



app.use("/api", blogrouter);
app.use("/api", emailRouter);
export default app;
