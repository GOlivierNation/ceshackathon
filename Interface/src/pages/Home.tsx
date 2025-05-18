
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);
  
  return (
    <div className="flex justify-center items-center h-screen bg-[#f4f6f9]">
      <div className="text-center bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold text-gray-700">Redirecting...</h1>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3f6791] mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
