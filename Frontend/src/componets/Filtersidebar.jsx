import { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  Paper
} from '@mui/material';

// Mock Data matching the video's layout
const CATEGORIES = ["14K,58.3%  (12)",'18K,75.0% (12)',"22k,91.7%  (12)","24K,99.9%","Bangles  (12)","Best seller  (12)","Bracelets  (12)","Brooch  (12)",
    "chain  (12)","Diamond  (12)","Diamondss  (12)","Earrings  (12)","Gold  (12)","jewellery  (12)","Meenakari  (12)","Necklace  (12)","New Product  (12)",
    "Nose pins  (12)","Pendant  (12)","Platinum ring  (12)","Rings  (12)","Rose gold  (12)","Trending product  (12)"
];
const COLORS = [
  { name: 'Beige', hex: '#E5D3B3' },
  { name: 'Bronze', hex: '#CD7F32' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Orange', hex: '#FFA500' },
  {name:'Pose gold',hex:'#acaaa6'},
  {name:"Silver",hex:'#e3ecea'},
  {name:"Yellow",}
];

export default function FilterSidebar() {
 
  const [selectedCategories, setSelectedCategories] = useState(['Diamonds']);
  const [availability, setAvailability] = useState({ inStock: true, outOfStock: false });
  const [priceRange, setPriceRange] = useState([0, 28]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleAvailabilityChange = (event) => {
    setAvailability({ ...availability, [event.target.name]: event.target.checked });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleColorChange = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  return (
    <Paper elevation={0} sx={{ width: 280, p: 3, borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
      
      {/* Categories Section */}
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Categories
      </Typography>
      <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 3, pr: 1 }}>
        <FormGroup>
          {CATEGORIES.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  size="small"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  color="default"
                />
              }
              label={<Typography variant="body2">{category}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Availability Section */}
      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
        Availability
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              name="inStock"
              checked={availability.inStock}
              onChange={handleAvailabilityChange}
              color="default"
            />
          }
          label={<Typography variant="body2">In stock</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              name="outOfStock"
              checked={availability.outOfStock}
              onChange={handleAvailabilityChange}
              color="default"
            />
          }
          label={<Typography variant="body2">Out of stock</Typography>}
        />
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      {/* Price Filter Section */}
      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
        Price
      </Typography>
      <Box sx={{ px: 1, mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          The highest price is Rs. 28.00
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={28}
          color="default"
          sx={{ mt: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">From: ₹{priceRange[0]}</Typography>
          <Typography variant="body2">To: ₹{priceRange[1]}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Color Filter Section */}
      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
        Color
      </Typography>
      <FormGroup>
        {COLORS.map((color) => (
          <FormControlLabel
            key={color.name}
            control={
              <Checkbox
                size="small"
                checked={selectedColors.includes(color.name)}
                onChange={() => handleColorChange(color.name)}
                color="default"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    border: '1px solid #ccc'
                  }}
                />
                <Typography variant="body2">{color.name}</Typography>
              </Box>
            }
          />
        ))}
      </FormGroup>

    </Paper>
  );
}