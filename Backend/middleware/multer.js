import multer from "multer";
import path from "path";

// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/", // Store files in 'uploads/' directory
    filename: (req, file, callback) => {
      const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
      callback(null, `${file.fieldname}-${uniqueSuffix}`); // Example: 'image-1618913023891.jpg'
    },
  }),
  fileFilter: (req, file, callback) => {
    const filetypes = /jpg|jpeg|png|gif/;
    const isValidType =
      filetypes.test(path.extname(file.originalname).toLowerCase()) &&
      filetypes.test(file.mimetype);
    isValidType
      ? callback(null, true)
      : callback(new Error("Only images are allowed!"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

export default upload;
