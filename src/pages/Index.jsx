import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function Index() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const userId = localStorage.getItem("id");
      const userToken = localStorage.getItem("token");
      if (userId && userToken) {
        navigate("/u/");
        return;
      }
      navigate("/auth/");
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  if (loading) {
    return <LoadingPage />;
  }
  return null;
}

export default Index;
