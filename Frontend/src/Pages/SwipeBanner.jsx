import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/slider1.webp";
import banner2 from "../assets/slider2.webp";
import banner3 from "../assets/slider3.webp";
import logo from "../assets/jewelry-4-slider-label.webp";

const QuickBanners = () => {
  const slides = [
    { image: banner1, title: "Jewelry is our \npassion" },
    {image: banner2 , title: "Crafting beauty \nwith love" },
    { image: banner3, title: "Elegance is our \nobsession" }
  ];

  return (
   <>
    <Box
      sx={{
        width: "100%",
        position: "relative",                
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn"
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: { xs: 320, md: 720 },
                width: "100%",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center", 
                textAlign: "center",
                px: 2
              }}
            >
              {/* Logo */}
              <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{ width: 80, mb: 2 }}
              />

              {/* Heading */}
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif', // IMPORTANT
                  fontSize: { xs: "2rem", md: "100px" },
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: "#2c2c2c",
                  maxWidth: "700px",
                  mb: 3,
                  whiteSpace: "pre-line"
                }}
              >
                {item.title}
              </Typography>

              {/* Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#b08b74",
                  borderRadius: "30px",
                  px: 5,
                  py: 1.5,
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  "&:hover": {
                    backgroundColor: "#98755e"
                  }
                }}
              >
                Shop Now
              </Button>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LEFT ARROW */}
      <IconButton
        className="prev-btn"
        sx={{
          position: "absolute",
          top: "50%",
          left: 20,
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.7)",
          "&:hover": { backgroundColor: "#fff" }
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      {/* RIGHT ARROW */}
      <IconButton
        className="next-btn"
        sx={{
          position: "absolute",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.7)",
          "&:hover": { backgroundColor: "#fff" }
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
    </>
  );
};

export default QuickBanners;