export const queryParams = (qp) => {
  const obj = { ...qp };

  obj["createdBy_id"] = obj.createdBy_id ? `AND t.created_by = ?` : "";
  obj["assignTo_id"] = obj.assignTo_id ? `AND t.assign_to = ?` : "";
  obj["status"] = obj.status ? `AND status = ?` : "";
  obj["category_id"] = obj.category_id ? `AND t.category_id = ?` : "";
  obj["search"] = obj.search ? `AND t.title LIKE ?` : "";
  obj["page"] = "";

  const pages = qp.page ? ` OFFSET ${(Number(qp.page) - 1) * 8}` : "";

  const query =
    "SELECT COUNT(*) OVER () AS totalNumberOfRows, t.id, `title`, `description`, `status`, cb.full_name as createdBy, cb.email as createdBy_email, cb.profile_pic as createdBy_profile_pic," +
    "ast.profile_pic as assignTo_profile_pic, ast.email as assignTo_email, ast.full_name as assignTo, `created_at`, `started_at`, `finished_at`," +
    "c.name as companyName, ct.name as categoryName FROM tasks t JOIN companies c ON c.id = t.company_id JOIN categories ct ON t.category_id =" +
    "ct.id JOIN users cb ON t.created_by = cb.id JOIN users ast ON t.assign_to = ast.id WHERE t.company_id = ? " +
    Object.values(obj).join(" ") +
    "ORDER BY t.id DESC LIMIT 8" +
    pages;

  return query;
};
