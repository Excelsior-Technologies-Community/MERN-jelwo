import React, { useState } from 'react'; 
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import banner from '../assets/all-banner.jpg';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import Banner from '../componets/Banner'

const Login = () => {
  const navigate = useNavigate();
  
  // State initialization
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });

  // State change handler
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value // Fixed: e.targer ko e.target kiya
    });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:3000/api/auth/login', formdata);

      alert(response.data.message || 'Login Successful!');
      
      
      if (response.data.user?.token) {
        localStorage.setItem('token', response.data.user.token);
      }

      navigate('/'); 
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      {/* Banner Section */}
      <Banner title="Account" image={banner} />

      {/* Login Form Section */}
      <Container maxWidth="sm" sx={{ mt: 6, mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontFamily: 'serif', fontWeight: '400', mb: 2 }}>
          Login account
        </Typography>
       
        {/* onSubmit handler add kiya */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>
                  
          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: '#555' }}> Email address </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Email address"
              variant="outlined"
              name="email"            
              value={formdata.email}   // Linked to state
              onChange={handleChange}  //  Linked to handler
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
            />
          </Box>
         
          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: '#555' }}> Password </Typography>
            <TextField
              fullWidth
              size="small"
              type="password"
              placeholder="Password"
              variant="outlined"
              name="password"           
              value={formdata.password}  // Linked to state
              onChange={handleChange}   //  Linked to handler
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Button 
              variant="contained" 
              type="submit" 
              sx={{ 
                bgcolor: '#a37f61', 
                color: '#fff', 
                borderRadius: '20px', 
                px: 4, 
                py: 1,
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#8c6b50', boxShadow: 'none' }
              }}
            >
              SIGN IN
            </Button>
            
            <Link href="#" underline="always" sx={{ color: '#777', fontSize: '0.9rem', '&:hover': { color: '#a37f61' } }}>
              Forgot your password?
            </Link>
          </Box>
     
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/register')} 
              aria-label="register"
              sx={{ 
                bgcolor: '#a37f61', 
                color: '#fff', 
                borderRadius: '20px', 
                px: 5, 
                py: 1,
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#8c6b50', boxShadow: 'none' }
              }}
            >
              CREATE ACCOUNT
            </Button>
          </Box>

        </Box>
      </Container>
    </>
  );
};

export default Login;