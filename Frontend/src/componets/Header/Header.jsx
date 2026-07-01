import React from 'react';
import logo from '../../assets/jelwo.webp'
import { AppBar, Toolbar, Typography, Box, TextField, IconButton, Badge } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (

        <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#333333', boxShadow: 'none', borderBottom: '1px solid #f0f0f0' }}>

            {/* top row */}
            <Toolbar sx={{ justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5', px: 2 }}>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box component="img" src={logo} alt="Jelwo Logo" sx={{ height: '30px', objectFit: 'contain' }} />
                    <Typography variant="body2"
                        sx={{ color: '#888888', display: { xs: 'none', md: 'block' } }}>
                        | Free UK standard delivery on all orders.
                    </Typography>
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>

                    <TextField
                        size="small"
                        placeholder="Search product..."
                        slotProps={{
                            input: {
                                endAdornment: <SearchIcon sx={{ color: '#888888' }} />
                            }
                        }}
                        sx={{
                            width: { xs: 180, sm: 260 },
                            '& .MuiOutlinedInput-root': { borderRadius: '20px' }
                        }}
                    />

                    {/* Icon Row */}
                    <Box sx={{ display: 'flex', gap: 1 }}>

                        <IconButton color="inherit" onClick={() => navigate('/login')} aria-label="login">
                            <PersonOutlineIcon />
                        </IconButton>

                        <IconButton color="inherit">

                            <Badge badgeContent={0} color="error" showZero>
                                <FavoriteBorderIcon />
                            </Badge>
                        </IconButton>

                        <IconButton color="inherit">

                            <Badge badgeContent={0} color="error" showZero>
                                <ShoppingBagOutlinedIcon />
                            </Badge>

                        </IconButton>

                    </Box>
                </Box>

            </Toolbar>

            {/* bottom row  */}
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: '50px !important', px: 2 }}>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneInTalkIcon sx={{ color: '#b08b57', fontSize: '1.2rem' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>(220) 123 456 7890</Typography>
                </Box>


                <Box sx={{ display: 'flex', gap: 4 }}>
                    {['HOME', 'SHOP', 'PRODUCTS', 'BLOG', 'PAGES'].map((menuItem) => (
                        <Box
                            key={menuItem}
                            className='hvr-underline-from-center'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                '&:hover': { color: '#b08b57' }
                            }}

                        >
                            {menuItem}
                            {menuItem !== 'BLOG' && <KeyboardArrowDownIcon sx={{ fontSize: '1rem', ml: 0.3 }} />}
                        </Box>
                    ))}
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>

                    <HomeOutlinedIcon sx={{ color: '#b08b57', fontSize: '1.2rem' }} />

                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                        FREE TRY AT HOME
                    </Typography>
                </Box>

            </Toolbar>

        </AppBar>
    );
}