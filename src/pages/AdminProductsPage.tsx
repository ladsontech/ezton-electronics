
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProductsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main admin page
    navigate("/admin");
  }, [navigate]);

  return null;
}
