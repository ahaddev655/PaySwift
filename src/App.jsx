import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthenticationPage from './pages/AuthenticationPage';
import UserLandingPage from "./pages/user/UserLandingPage";
import UserLayout from "./layouts/UserLayout";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticationPage />,
    },
    {
      path: "/u/",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <UserLandingPage />
        }
      ]
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
