import multer from "multer";
import fs from "fs";

// Ensure the uploads directory exists
const uploadsDir = "/tmp/uploads"; // Use a temporary directory for deployment
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname); // Generate a unique filename
    },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

export default upload;