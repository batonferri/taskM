import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getUsers = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = "SELECT *, NULL AS password FROM users WHERE company_id=?";
    db.query(query, [userInfo.companyId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

export const getUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "SELECT *, NULL AS password FROM users WHERE company_id=? AND id=?";
    db.query(query, [userInfo.companyId, req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data[0]);
    });
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (req.params.id == userInfo.id)
      return res.status(403).json("You can't edit someone else's profile!");

    const q =
      "UPDATE users SET `profile_pic`=?, `full_name`=?, `email`=? WHERE `id` = ?";

    db.query(
      q,
      [req.body.profilePic, req.body.name, req.body.email, userInfo.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Your profile has been updated");
      }
    );
  });
};
