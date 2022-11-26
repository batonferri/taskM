export const getStatusColor = (color) => {
  switch (color) {
    case "done":
    case "low":
      return "success";
    case "to do":
    case "high":
      return "danger";
    default:
      return "warning";
  }
};
