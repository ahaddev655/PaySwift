import { useEffect } from "react";
import UserProfileComponent from "../../components/user/UserProfileComponent";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
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
  return <UserProfileComponent />;
}

export default UserProfilePage;
