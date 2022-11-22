import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { hashPass, wrongPassword } from "../helper/hashPass.js";

export const register = (req, res, compKey) => {
  const t = "SELECT * FROM companies WHERE company_key = ?";
  db.query(
    t,
    [req.body.company_key ? req.body.company_key : compKey],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0)
        return res.status(409).json("Company key not valid");
      const company_id = data[0].id;

      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exist");

        const q =
          "INSERT INTO users(`full_name`,`email`,`password`, `company_id`, `is_admin`) VALUES (?)";
        const values = [
          req.body.full_name,
          req.body.email,
          hashPass(req.body.password),
          company_id,
          req.body.company_key ? 0 : 1,
        ];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("User has been created.");
        });
      });
    }
  );
};

export const company = (req, res) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exist");

    const companyKey = uuidv4();

    const q = "call register_company(?)";
    const values = [
      req.body.full_name,
      req.body.email,
      hashPass(req.body.password),
      req.body.name,
      companyKey,
      req.body.logo,
      req.body.main_color,
      req.body.secondary_color,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q =
    "SELECT u.id, `full_name`, `password`, `email`, `profile_pic`, `is_admin`, `company_id`, `logo`, `company_key`, c.name AS companyName FROM companies c JOIN users u ON c.id = u.company_id WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("Email not found");

    if (wrongPassword(req.body.password, data[0].password))
      return res.status(400).json("Wrong password");

    const token = jwt.sign(
      {
        id: data[0].id,
        companyId: data[0].company_id,
        companyKey: data[0].company_key,
        isAdmin: data[0].is_admin,
      },
      "jwtkey"
    );
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(jwt.sign(other, "jwtkey"));
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
