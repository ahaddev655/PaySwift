import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTransferComponent from "../../components/user/UserTransferComponent";

function UserTransferPage() {
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
      <UserTransferComponent />
  );
}

export default UserTransferPage;
