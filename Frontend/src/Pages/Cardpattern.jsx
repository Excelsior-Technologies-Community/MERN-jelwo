import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import card1 from '../assets/banner-1.webp';
import card2 from '../assets/banner-2.webp';

const Cardpattern = () => {
  return (
    <Box sx={{ mt: 6, px: { xs: 2, md: 6 } ,mb:6}}>

      {/* 🔥 TOP STRIP */}
      <Typography
        sx={{
          textAlign: 'center',
          width: { xs: '100%', md: '55%' },
          mx: 'auto',
          backgroundColor: '#f5f3f1',
          borderRadius: '40px',
          px: 3,
          py: 1.5,
          fontSize: { xs: '14px', md: '18px' },
          letterSpacing: '0.5px',
          mb: 6
        }}
      >
        DIAMONDS FOR EVERY EXCUSE 1500+ DESIGNS UNDER
        <Box
          component="span"
          sx={{
            ml: 1,
            px: 2,
            py: 0.5,
            borderRadius: '20px',
            backgroundColor: '#a67c63',
            color: '#fff',
            fontWeight: 600
          }}
        >
          $200
        </Box>
      </Typography>

      {/* 🔥 CARDS */}
      <Grid container spacing={4} sx={{textAlign: 'center', justifyContent: 'center'}}>

        {/* LEFT CARD */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: { xs: 300, md: 420 },
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              
            }}
          >
            {/* IMAGE */}
            <Box
              component="img"
              src={card1}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* TEXT OVERLAY */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '70%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'right',
                color: '#3a3a3a'
              }}
            >
              <Typography sx={{ fontSize: '13px', mb: 1 }}>
                GET A 30% DISCOUNT
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '26px', md: '42px' },
                  fontFamily: 'serif',
                  lineHeight: 1.2,
                  mb: 2
                }}
              >
                Exquisite <br /> collection
              </Typography>

              <Button
                sx={{
                  backgroundColor: '#a67c63',
                  color: '#fff',
                  px: 4,
                  borderRadius: '30px',
                  '&:hover': {
                    backgroundColor: '#8c644f'
                  }
                }}
              >
                SHOP NOW
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* RIGHT CARD */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: { xs: 300, md: 420 },
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* IMAGE */}
            <Box
              component="img"
              src={card2}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* TEXT OVERLAY */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'left',
                color: '#3a3a3a'
              }}
            >
              <Typography sx={{ fontSize: '13px', mb: 1 }}>
                20% OFF ON WASTAGE
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '26px', md: '42px' },
                  fontFamily: 'serif',
                  lineHeight: 1.2,
                  mb: 2
                }}
              >
                Diamond <br /> necklace
              </Typography>

              <Button
                sx={{
                  backgroundColor: '#a67c63',
                  color: '#fff',
                  px: 4,
                  borderRadius: '30px',
                  '&:hover': {
                    backgroundColor: '#8c644f'
                  }
                }}
              >
                SHOP NOW
              </Button>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Cardpattern;