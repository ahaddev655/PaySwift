import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";

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
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
