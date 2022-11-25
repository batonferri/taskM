import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import RedirectLayout from "./components/RedirectLayout";
import AddTask from "./pages/AddTask";
import Profile from "./pages/Profile";
import Task from "./pages/Task";
import SideBar from "./components/SideBar";
import CompanyPanel from "./pages/CompanyPanel";

const MainLayout = () => {
  return (
    <div>
      <SideBar />
      <div style={{ marginLeft: "280px" }}>
        <Outlet />
      </div>
    </div>
  );
};

// const MainLayout = () => {
//   return (
//     <div>
//       <Navbar />
//       <Outlet />
//     </div>
//   );
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/addtask",
            element: <AddTask />,
          },
          {
            path: "/task/:id",
            element: <Task />,
          },
          {
            path: "/panel",
            element: <CompanyPanel />,
          },
        ],
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <div className="app">
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
