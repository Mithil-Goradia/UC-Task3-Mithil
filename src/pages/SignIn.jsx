import { Container, Typography, TextField, Box, Button } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    mobileno: '',
    age: '', // Add age to the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const { name, email, password, mobileno, age } = userDetails;

    // Regex validation
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const agePattern = /^(1[89]|[2-9][0-9])$/; // Age should be between 18 and 99

    if (!namePattern.test(name)) {
      Swal.fire('Invalid Name', 'Please enter a valid name', 'error');
      return;
    }
    if (!emailPattern.test(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email', 'error');
      return;
    }
    if (!passwordPattern.test(password)) {
      Swal.fire('Invalid Password', 'Password must be at least 6 characters long', 'error');
      return;
    }
    if (!agePattern.test(age)) {
      Swal.fire('Invalid Age', 'Please enter a valid age (between 18 and 99)', 'error');
      return;
    }

    // After successful validation, make an API call
    axios.post('https://uc-fd-auth-backend.onrender.com/user/register', userDetails)
      .then(response => {
        login(response.data.token, name);
        Swal.fire('Sign-Up Successful', 'You can now log in.', 'success');
        navigate('/login');
      })
      .catch(error => {
        console.error('Registration error:', error);
        if (error.response && error.response.status === 409) {
          Swal.fire('Sign-Up Failed', 'Email already exists. Please use a different email.', 'error');
        } else {
          Swal.fire('Sign-Up Failed', 'Please try again.', 'error');
        }
      });
  };

  return (
    <Container maxWidth="sm" sx={{
      bgcolor: '#D2FF72',
      p: '16px',
      color: 'black',
      font: 'roboto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      borderRadius: '20px',
      width: '300px'
    }}>
      <Typography variant='h4' component="h1" sx={{ fontWeight: 'bold' }}>
        Sign-Up
      </Typography>

      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', fontWeight: 'bold' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Name:</Typography>
            <TextField size="small" fullWidth variant="outlined" placeholder='Enter your name' name='name' value={userDetails.name} onChange={handleChange} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', fontWeight: 'bold' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Email-id:</Typography>
            <TextField size='small' fullWidth variant="outlined" placeholder='Enter your email-id' name='email' value={userDetails.email} onChange={handleChange} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', fontWeight: 'bold' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Password:</Typography>
            <TextField size='small' fullWidth variant="outlined" placeholder='Enter your password' type='password' name='password' value={userDetails.password} onChange={handleChange} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', fontWeight: 'bold' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Number:</Typography>
            <TextField size='small' fullWidth variant="outlined" placeholder='Enter your contact' name='mobileno' value={userDetails.mobileno} onChange={handleChange} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', fontWeight: 'bold' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Age:</Typography>
            <TextField size='small' fullWidth variant="outlined" placeholder='Enter your age' type='number' name='age' value={userDetails.age} onChange={handleChange} />
          </Box>
        </Box>
      </form>

      <Button variant='contained' onClick={handleNext}>Next</Button>
    </Container>
  );
};

export default SignIn;
