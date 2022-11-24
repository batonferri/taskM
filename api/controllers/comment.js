import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getComments = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "SELECT c.id, c.message, c.created_at, u.full_name, u.profile_pic FROM comments c JOIN users u on c.created_by = u.id  WHERE `task_id` = ? ORDER BY c.id DESC";
    db.query(query, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

export const addComment = (req, res) => {
  return res.json("BINGBONG");
};
