import jwt from "jsonwebtoken";
import { db } from "../db.js";
import dayjs from "dayjs";

export const getTasks = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "SELECT t.id, `title`, `description`, `status`, cb.full_name as createdBy, cb.email as createdBy_email, cb.profile_pic as createdBy_profile_pic, ast.profile_pic as assignTo_profile_pic, ast.email as assignTo_email, ast.full_name as assignTo, `created_at`, `updated_at`, `finished_at`, c.name as companyName, ct.name as categoryName FROM tasks t JOIN companies c ON c.id = t.company_id JOIN categories ct ON t.category_id = ct.id JOIN users cb ON t.created_by = cb.id JOIN users ast ON t.assign_to = ast.id WHERE t.company_id = ? ORDER BY t.id DESC";

    db.query(query, [userInfo.companyId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

export const getTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "SELECT t.id, `title`, `description`, `status`, cb.id as createdBy_id, cb.full_name as createdBy, cb.email as createdBy_email, cb.profile_pic as createdBy_profile_pic, ast.id as assignTo_id, ast.profile_pic as assignTo_profile_pic, ast.email as assignTo_email, ast.full_name as assignTo, `created_at`, `updated_at`, `finished_at`, c.name as companyName, ct.name as categoryName FROM tasks t JOIN companies c ON c.id = t.company_id JOIN categories ct ON t.category_id = ct.id JOIN users cb ON t.created_by = cb.id JOIN users ast ON t.assign_to = ast.id WHERE t.id = ?";

    db.query(query, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data[0]);
    });
  });
};

export const startTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const query =
      "UPDATE tasks SET `status`= 'In Progress' WHERE `id` = ? AND `assign_to` = ?";

    db.query(query, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.json("Only assign user can start this task");
      return res.json("Task has started");
    });
  });
};

export const addTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "INSERT INTO tasks(`title`, `description`, `status`, `created_by`, `assign_to`,`created_at`, `category_id`, `company_id`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      "To Do",
      userInfo.id,
      Number(req.body.assign_to),
      dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
      Number(req.body.category_id),
      userInfo.companyId,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Task has been created.");
    });
  });
};
