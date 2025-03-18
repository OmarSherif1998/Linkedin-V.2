/** @format */
//fileRouter.js
import express from "express";
import {
  uploadProfilePictures,
  uploadPostsPictures,
} from "../storage/multerConfig.js";
const fileRouter = express.Router();
const MAX_FILES = 5;
// Import your multer configuration

// Backend route for profile picture upload
fileRouter.post(
  "/uploadProfilePic",
  uploadProfilePictures.single("profilePic"),
  (req, res) => {
    try {
      // Access the uploaded file via req.file
      const file = req.file;

      // Check if file is received
      if (!file) {
        return res.status(400).json({ message: "File not found" });
      }

      // Successfully uploaded file, respond with the file URL
      res.status(200).json(file); // Ensure this matches frontend expectations
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during file upload:", error);
      res
        .status(500)
        .json({ message: "An error occurred while uploading the file." });
    }
  },
);

fileRouter.post(
  "/uploadPostPic",
  uploadPostsPictures.array("postPic", MAX_FILES),
  (req, res) => {
    try {
      const files = req.files; // Accessing files from req.files
      console.log("files: ", files);

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
      }

      if (files.length > MAX_FILES) {
        return res
          .status(400)
          .json({ message: "Too many files. Max allowed is " + MAX_FILES });
      }

      // Assuming you use diskStorage and file.path is available
      const fileUrls = files.map((file) => file.path);

      res.status(200).json({ urls: fileUrls });
    } catch (error) {
      console.error("Error uploading files:", error);
      res
        .status(500)
        .json({ message: "An error occurred while uploading the files." });
    }
  },
);

export default fileRouter;
