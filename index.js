import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config({path:".env"});
const PORT = process.env.PORT || 7000


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI_CLOUD)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));