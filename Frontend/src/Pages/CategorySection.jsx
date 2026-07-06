import React from 'react';
import { Box, Typography, Card, Button, Grid } from '@mui/material';
import { Autoplay } from 'swiper/modules';
import rings from '../assets/ring.webp';
import earrings from '../assets/earrings.webp';
import bracelets from '../assets/braceletes.webp';
import necklaces from '../assets/necklace.webp';
import pandels from '../assets/pandels.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'hover.css/css/hover-min.css';
import { useNavigate } from "react-router-dom";
const categories = [
  { id: 1, name: 'Rings', items: '12+ Items', image: rings, path: "/ring-category" },
  { id: 2, name: 'Earrings', items: '10+ Items', image: earrings },
  { id: 3, name: 'Bracelets', items: '12+ Items', image: bracelets },
  { id: 4, name: 'Necklaces', items: '12+ Items', image: necklaces },
  { id: 5, name: 'Pandels', items: '12+ Items', image: pandels },
];

export default function CategorySection() {
   const navigate = useNavigate();
  return (
    <Box sx={{ mt: 6, mb: "5%", px: { xs: 2, md: 6 } }}>
      <Typography variant='title'
        component='h2'
        sx={{ textAlign: 'center', fontWeight: 'normal', fontSize: { md: '50px', xs: '26px' }, mt: "20px", mb: '20px' }}
      >Popular category
      </Typography>

      <Box sx={{ width: "85%", mx: "auto" }}>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            }
          }}
        >

          {categories.map((item) => (
            <SwiperSlide key={item.id}>


              <Box
              onClick={() => navigate(item.path)}
                sx={{
                  position: 'relative',
                  height: { xs: 300, sm: 350, md: 450 },
                  overflow: 'hidden'
                }}
              >

                {/* IMAGE */}
                <Box
                  component="img"
                  src={item.image}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  className='hvr-Hollow'
                />

                {/* OVERLAY BOX */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    backgroundColor: '#eae8e6',
                    textAlign: 'center',
                    borderRadius: '10px',
                    height: { xs: '100px', md: '100px' },
                    py: { xs: 1, md: 2 }
                  }}
                >
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#626161' }}>
                    {item.items}
                  </Typography>

                  <Typography sx={{ fontSize: '40px', fontFamily: 'serif', fontWeight: 'normal' }}>
                    {item.name}
                  </Typography>

                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#626161', mb: 4 }}>
                    SHOP NOW
                  </Typography>
                </Box>

              </Box>

            </SwiperSlide>
          ))}

        </Swiper>
      </Box>
    </Box>
  )
}