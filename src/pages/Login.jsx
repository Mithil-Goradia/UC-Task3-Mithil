import { useContext, useState } from "react";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailPattern.test(email)) {
      Swal.fire("Invalid Email", "Please enter a valid email.", "error");
      return;
    }

    if (!passwordPattern.test(password)) {
      Swal.fire("Invalid Password", "Password must be at least 6 characters long and contain at least one letter and one number.", "error");
      return;
    }

    axios
      .post("https://uc-fd-auth-backend.onrender.com/user/login", { email, password })
      .then((response) => {
        const token = response.data;
        if (token) {
          login(token);
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "You will be redirected to the homepage.",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/home");
          });
        } else {
          Swal.fire("Login Failed", "No token received. Please try again.", "error");
        }
      })
      .catch((error) => {
        console.error("Login error:", error.response ? error.response.data : error);
        Swal.fire("Login Failed", "Invalid email or password. Please try again.", "error");
      });
  };

  const handleBack = () => {
    navigate("/signin");
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
        Log-in
      </Typography>
      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Enter your email-id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </form>
      <Button variant="contained" onClick={handleLogin} sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
        Next
      </Button>
      <Button
        variant="outlined"
        onClick={handleBack}
        size="small"
        sx={{
          fontSize: { xs: "10px", sm: "12px" },
          alignSelf: "flex-end",
        }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default Login;
