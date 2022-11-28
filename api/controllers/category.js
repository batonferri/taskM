import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getCategories = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = "SELECT * FROM categories WHERE company_id=?";
    db.query(query, [userInfo.companyId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

export const addCategory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = "INSERT INTO categories(`name`, `company_id`) VALUES (?)";
    const values = [req.body.category, userInfo.companyId];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Category has ben added");
    });
  });
};

export const deleteCategory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = "DELETE FROM categories WHERE id=? AND company_id=?";
    db.query(query, [req.body.id, userInfo.companyId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Category has ben deleted");
    });
  });
};
