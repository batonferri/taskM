import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getUsers = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = "SELECT * FROM users WHERE company_id=?";
    db.query(query, [userInfo.companyId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE users SET `profile_pic`=? WHERE `id` = ?";

    db.query(q, [req.body.image, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Your profile pic has been updated");
    });
  });
};
