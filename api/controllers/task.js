import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { queryParams } from "../helper/queryParams.js";
import dayjs from "dayjs";

export const getTasks = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    db.query(
      queryParams(req.query),
      [userInfo.companyId, ...Object.values(req.query)],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
      }
    );
  });
};

export const getTaskCount = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = "call company_task_chart(?)";

    db.query(query, [[userInfo.companyId]], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data[0][0]);
    });
  });
};

export const getTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "SELECT t.id, `title`, `description`, `status`, `deadline`, `priority`, cb.id as createdBy_id, cb.full_name as createdBy, cb.email as createdBy_email, cb.profile_pic as createdBy_profile_pic, ast.id as assignTo_id, ast.profile_pic as assignTo_profile_pic, ast.email as assignTo_email, ast.full_name as assignTo, `created_at`, `started_at`, `finished_at`, c.name as companyName, ct.name as categoryName FROM tasks t JOIN companies c ON c.id = t.company_id JOIN categories ct ON t.category_id = ct.id JOIN users cb ON t.created_by = cb.id JOIN users ast ON t.assign_to = ast.id WHERE t.id = ?";

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
      "UPDATE tasks SET `status`= 'In Progress', `started_at` = now() WHERE `id` = ? AND `assign_to` = ?";

    db.query(query, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.json("Only assign user can start this task");
      return res.json("Task has started");
    });
  });
};

export const closeTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const query =
      "UPDATE tasks SET `status`= 'Done', `finished_at` = now() WHERE `id` = ? AND `created_by` = ?";

    db.query(query, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.json("Only the user who created this task can close it");
      return res.json("Task has ben closed");
    });
  });
};

export const addTask = (req, res) => {
  const token = req.cookies.access_token;

  if (req.body.title.length < 1)
    return res.status(400).json("Title is required");
  if (req.body.description.length < 1)
    return res.status(400).json("Description is required");
  if (req.body.assign_to === 0)
    return res.status(400).json("Assign To is required");
  if (req.body.category_id === 0)
    return res.status(400).json("Category is required");
  if (req.body.priority.length < 1)
    return res.status(400).json("Priority is required");
  if (req.body.deadline.length < 1)
    return res.status(400).json("Deadline is required");

  if (dayjs(req.body.deadline).diff(dayjs(), "day", true) < 1)
    return res.status(400).json("Deadline should be at least 24h");

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "INSERT INTO tasks(`title`, `description`, `status`, `created_by`, `assign_to`, `priority`, `deadline`, `category_id`, `company_id`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      "To Do",
      userInfo.id,
      req.body.assign_to,
      req.body.priority,
      req.body.deadline,
      req.body.category_id,
      userInfo.companyId,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Task has been created.");
    });
  });
};
