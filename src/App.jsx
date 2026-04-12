import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import UserLayout from "./layouts/UserLayout";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserTransferPage from "./pages/user/UserTransferPage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/auth/",
      element: <AuthPage />,
    },
    {
      path: "/u/",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <UserDashboardPage />,
        },
        {
          path: "transfer",
          element: <UserTransferPage />,
        },
        {
          path: "history",
          element: "HistoryPage",
        },
        {
          path: "profile",
          element: "ProfilePage",
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
