import express from "express";
import taskRoutes from "./routes/task.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import commentsRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import multer from "multer";
const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, `../upload/` + Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
