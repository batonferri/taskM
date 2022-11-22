export const getStatusColor = (color) => {
  switch (color) {
    case "done":
      return "success";
    case "to do":
      return "danger";
    default:
      return "warning";
  }
};
