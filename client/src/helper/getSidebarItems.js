import { sidebarAdminItems, sidebarUserItems } from "../util/sideBar";

export const getSidebarItems = (isAdmin) => {
  return isAdmin ? sidebarAdminItems : sidebarUserItems;
};
