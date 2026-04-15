import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import UserLayout from "./layouts/UserLayout";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserTransferPage from "./pages/user/UserTransferPage";
import UserHistoryPage from './pages/user/UserHistoryPage';
import UserProfilePage from "./pages/user/UserProfilePage";
import UserSecurityPage from './pages/user/UserSecurityPage';
import UserNotificationPage from './pages/user/UserNotificationPage';
import UserSettingsPage from './pages/user/UserSettingsPage';
import UserCardsPage from './pages/user/UserCardsPage';
import UserHelpSupportPage from "./pages/user/userHelpSupportPage";

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
          element: <UserHistoryPage />,
        },
        {
          path: "profile",
          element: <UserProfilePage />,
        },
        {
          path: "security",
          element: <UserSecurityPage />,
        },
        {
          path: "notifications",
          element: <UserNotificationPage />,
        },
        {
          path: "settings",
          element: <UserSettingsPage />,
        },
        {
          path: "cards",
          element: <UserCardsPage />,
        },
        {
          path: "help",
          element: <UserHelpSupportPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
