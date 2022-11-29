import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const updateCompanyInfo = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE companies SET `logo`=?, `name`=? WHERE `id` = ?";

    db.query(
      q,
      [req.body.profilePic, req.body.name, userInfo.companyId],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Company info have been updated");
      }
    );
  });
};
