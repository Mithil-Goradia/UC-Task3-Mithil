import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');  // Retrieve token from localStorage
  const [username, setUsername] = useState('');

  const login = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('token', newToken);  // Save token to localStorage
    localStorage.setItem('username', newUsername);
  };

  // Function to handle logout and clear token
  const logout = () => {
    setToken(''); 
    setUsername(''); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('username'); 
};

  // Provide the token and login/logout functions to the entire app
  return (
    <AuthContext.Provider value={{ token,username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
