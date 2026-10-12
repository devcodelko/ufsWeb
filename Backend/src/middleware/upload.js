const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.resolve(__dirname, "../../public/uploads/resumes");
const photoUploadDir = path.resolve(__dirname, "../../public/uploads/photos");
const blogImageDir = path.resolve(__dirname, "../../public/uploads/blogs");

[uploadDir, photoUploadDir, blogImageDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const resumeFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  [".pdf", ".doc", ".docx"].includes(ext)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Only PDF and Word documents are allowed."), false);
};

const uploadResume = multer({ storage: resumeStorage, fileFilter: resumeFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, photoUploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `photo-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Only JPG, PNG, and WebP images are allowed."), false);
};

const uploadPhoto = multer({ storage: photoStorage, fileFilter: imageFilter, limits: { fileSize: 3 * 1024 * 1024 } });

const blogImageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, blogImageDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `blog-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const uploadBlogImage = multer({ storage: blogImageStorage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { uploadResume, uploadPhoto, uploadBlogImage };
