import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
        withCredentials: true,
      });

      alert("Logged out successfully");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleLogout}>Logout</Button>
    
    </div>
  );
};

export default Logout;
