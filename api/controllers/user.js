import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { getUserLogicFun } from "../helper/logicFunctions.js";

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
      "select COUNT(t.id) OVER () AS totalTasks, (select COUNT(*) from tasks where assign_to = u.id and status = 'In Progress') as tasksInProgress, (select COUNT(*) from tasks where assign_to = u.id and status = 'To Do') as tasksToDo, (select COUNT(*) from tasks where assign_to = u.id and status = 'Done') as tasksDone, u.id as userId, u.full_name, u.email, u.profile_pic, u.is_admin, t.id as taskId, t.title, t.status, t.created_at, c.name as category from users u LEFT JOIN tasks t on u.id = t.assign_to JOIN categories c on t.category_id = c.id WHERE u.id = ? order by t.id desc limit 3";
    db.query(query, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(getUserLogicFun(data));
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
