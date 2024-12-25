import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { AuthProvider } from './pages/AuthContext'; // Import the AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
