import React from 'react';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import banner from '../assets/all-banner.jpg'

const Login = () => {
    return (
        <>

            <Box sx={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', }}>
                <Box
                    component="img"
                    src={banner}
                    alt="Login Banner"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >
                    <Typography variant="body2" sx={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', opacity: 0.8 }}>
                        Home -Create Account
                    </Typography>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: '500', mt: 1 }}>
                        Create Account
                    </Typography>
                </Box>
            </Box>

            <Container maxWidth="sm" sx={{ mt: 6, mb: 6, textAlign: 'center' }}>

                <Typography variant="h4" component="h2" sx={{ fontFamily: 'serif', fontWeight: '400', mb: 2 }}>
                    Create Account
                </Typography>

                <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>  First name </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="First name"
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, color: '#555' }}> Last name </Typography>
                        <TextField
                            fullWidth
                            size="small"

                            placeholder="Last name"
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, color: '#555' }}> Email address </Typography>
                        <TextField
                            fullWidth
                            size="small"

                            placeholder="Email address"
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, color: '#555' }}> Password </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="password"
                            placeholder="password"
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                    </Box>

                   

                    <Box sx={{ display: 'flex', justifyContent: 'start', mt: 3 }}>
                        <Button
                            variant="contained"
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
                            CREATE 
                        </Button>
                    </Box>

                </Box>
            </Container>
        </>
    );
};

export default Login;