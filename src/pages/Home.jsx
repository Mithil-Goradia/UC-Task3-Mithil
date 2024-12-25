import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { token, username, logout } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          "https://uc-fd-auth-backend.onrender.com/user/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    if (token) {
      fetchDetails();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: "#D2FF72",
        p: { xs: "12px", sm: "16px" },
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        borderRadius: "20px",
        width: { xs: "100%", sm: "300px" },
        boxShadow: { xs: "none", sm: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", fontSize: { xs: "18px", sm: "24px" } }}>
        Welcome {username}!
      </Typography>
      <Typography variant="h6" sx={{ fontSize: { xs: "16px", sm: "20px" } }}>
        Order History
      </Typography>
      {orderDetails.length > 0 ? (
        orderDetails.map((order) => (
          <Container
            key={order.id}
            sx={{
              bgcolor: "#def9a3",
              borderRadius: "10px",
              p: { xs: "8px", sm: "16px" },
              mb: "8px",
            }}
          >
            <Typography variant="body1">Order ID: {order.id}</Typography>
            <Typography variant="body2">Item: {order.item}</Typography>
            <Typography variant="body2">Price: ${order.price}</Typography>
            <Typography variant="body2">Date: {new Date(order.date).toLocaleDateString()}</Typography>
          </Container>
        ))
      ) : (
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          No orders found.
        </Typography>
      )}

      <Button
        variant="outlined"
        fullWidth
        onClick={handleLogout}
        sx={{
          fontSize: { xs: "12px", sm: "14px" },
          mt: { xs: "8px", sm: "16px" },
        }}
      >
        Log out
      </Button>
    </Container>
  );
};

export default Home;
