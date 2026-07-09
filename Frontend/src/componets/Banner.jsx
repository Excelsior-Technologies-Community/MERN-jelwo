import { Box, Typography } from "@mui/material";
import defaultBanner from "../assets/all-banner.jpg";

const Banner = ({ title, image = defaultBanner }) => {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "260px", overflow: "hidden" }}>
      <Box component="img" src={image} alt={title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Typography variant="body2" sx={{ letterSpacing: "2px", textTransform: "uppercase" }}>
          Home - {title}
        </Typography>

        <Typography variant="h3" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;