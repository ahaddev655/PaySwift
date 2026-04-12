import { useEffect } from "react";
import UserDashboardComponent from "../../components/user/UserDashboardComponent";
import { useNavigate } from "react-router-dom";

function UserDashboardPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const userToken = localStorage.getItem("token");
  // ==================== AUTH CHECK ====================
  useEffect(() => {
    if (userId && userToken) {
      return;
    }
    navigate("/auth");
  }, [navigate]);

  return (
    <div className="py-6">
      <UserDashboardComponent />
    </div>
  );
}

export default UserDashboardPage;
