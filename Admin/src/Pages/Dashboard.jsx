import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Paper, Typography, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Avatar, Card, CardContent, Divider
} from '@mui/material';
import { Add, Edit, Delete, CloudUpload } from '@mui/icons-material';

import api from '../utils/api';
import logo from '../assets/jelwo.webp';

const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants'];
const TAGS = ['JEWELRY', 'NEW ARRIVAL', 'BEST SELLER', 'SALE'];
const INITIAL_FORM = { name: '', tag: 'JEWELRY', category: '', price: '', discount: '' };

const SELECT_MENU_PROPS = {
  MenuProps: {
    PaperProps: {
      sx: {
        bgcolor: '#FFFFFF',
        color: '#111111',
        borderRadius: 0,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
        '& .MuiMenuItem-root': {
          color: '#111111',
        },
        '& .Mui-selected': {
          bgcolor: 'rgba(0, 0, 0, 0.08)',
        },
        '& .MuiMenuItem-root:hover': {
          bgcolor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dialog and Form States
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [hoverImageFile, setHoverImageFile] = useState(null);
  const [hoverImagePreview, setHoverImagePreview] = useState('');

  // Delete State
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value ?? '' }));
  };

  const getImageUrl = (url) => url?.startsWith('http') ? url : `http://localhost:3000${url}`;

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name,
        tag: product.tag || 'JEWELRY',
        category: product.category || '',
        price: product.price,
        discount: product.discount || ''
      });
      setImagePreview(getImageUrl(product.imageUrl));
      setHoverImagePreview(product.hoverImageUrl ? getImageUrl(product.hoverImageUrl) : '');
    } else {
      setEditingProduct(null);
      setForm(INITIAL_FORM);
      setImagePreview('');
      setHoverImagePreview('');
    }
    setImageFile(null);
    setHoverImageFile(null);
    setOpenDialog(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleHoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHoverImageFile(file);
      setHoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.category.trim()) return;

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (imageFile) formData.append('image', imageFile);
    if (hoverImageFile) formData.append('hoverImage', hoverImageFile);

    try {
      let response;
      if (editingProduct) {
        response = await api.put(`/products/${editingProduct.id}`, formData);
      } else {
        response = await api.post('/products', formData);
      }

      const savedProduct = response?.data?.product;
      if (savedProduct) {
        setProducts(prev => {
          if (editingProduct) {
            return prev.map(p => (p.id === savedProduct.id ? savedProduct : p));
          }
          return [...prev, savedProduct];
        });
      } else {
        await fetchProducts();
      }

      setOpenDialog(false);
      setEditingProduct(null);
      setForm(INITIAL_FORM);
      setImageFile(null);
      setImagePreview('');
      setHoverImageFile(null);
      setHoverImagePreview('');
    } catch (err) {
      console.error('Error saving product:', err.response?.data || err.message || err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await api.delete(`/products/${productToDelete.id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      setOpenDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const totalProducts = products.length;
  const totalCategories = new Set(products.map(p => p.category)).size;
  const prices = products.map(p => parseFloat(p.price) || 0).filter(p => p > 0);
  const avgPrice = prices.length ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : '0.00';

  return (
    <Box sx={{
      display: 'flex', minHeight: '100vh', bgcolor: '#FAFAFA',
      color: '#111111', fontFamily: '"Playfair Display", "Roboto", sans-serif'
    }}>

      {/*  Sidebar */}
      <Box sx={{ width: 260, bgcolor: '#FFFFFF', p: 3, display: 'flex', flexDirection: 'column', borderRight: '1px solid #EAEAEA' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box component="img"
            src={logo} alt="Jelwo Logo"
            sx={{ width: '85%', maxHeight: 45, objectFit: 'contain', mb: 5, mx: 'auto', display: 'block' }} />

          <Divider sx={{ bgcolor: '#EAEAEA', mb: 4 }} />

          <Button fullWidth variant="text"
            sx={{
              justifyContent: 'flex-start', color: '#111111', fontWeight: 600,
              letterSpacing: '1px', fontSize: '13px', borderLeft: '2px solid #111111',
              borderRadius: 0, pl: 2,
              '&:hover': { bgcolor: '#FAFAFA' }
            }}>
            INVENTORY MANAGER
          </Button>

        </Box>

      </Box>

      {/* Main Panel Content */}
      <Box sx={{ flexGrow: 1, p: 5, bgcolor: '#FAFAFA' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Box>
            <Typography variant="h4"
              sx={{ fontWeight: 500, letterSpacing: '0.5px', color: '#111111' }}>
              Product Inventory

            </Typography>

            <Typography variant="body2"
              sx={{ color: 'rgba(0,0,0,0.5)', mt: 0.5 }}>
              Manage your premium store listings and catalog details.
            </Typography>

          </Box>

          <Button variant="outlined" startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              color: '#111111', borderColor: '#111111', borderRadius: 0, px: 3, py: 1, fontWeight: 500, letterSpacing: '0.5px',
              '&:hover': { bgcolor: '#111111', color: '#FFFFFF', borderColor: '#111111' }
            }}>
            ADD PRODUCT
          </Button>

        </Box>

        {/* Minimalist Stark White Info Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {[
            { label: 'TOTAL PRODUCTS', val: totalProducts },
            { label: 'CATEGORIES', val: totalCategories },
            { label: 'AVERAGE PRICE', val: `$${avgPrice}` }
          ].map((card, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Card
                sx={{
                  bgcolor: '#FFFFFF', color: '#111111', borderRadius: 0, boxShadow: 'none',
                  border: '1px solid #EAEAEA'
                }}>

                <CardContent sx={{ p: 3 }}>

                  <Typography variant="caption"

                    sx={{ color: 'rgba(0,0,0,0.4)', letterSpacing: '1px', fontWeight: 600 }}>
                    {card.label}

                  </Typography>
                  <Typography variant="h4"
                    sx={{ fontWeight: 400, color: '#111111', mt: 1 }}>
                    {card.val}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Luxe Light Table View */}
        <TableContainer component={Paper} sx={{ bgcolor: '#FFFFFF', borderRadius: 0, boxShadow: 'none', border: '1px solid #EAEAEA' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#FAFAFA' }}>
              <TableRow>
                <TableCell sx={{ color: 'rgba(0,0,0,0.5)', borderBottom: '1px solid #EAEAEA', fontWeight: 600, letterSpacing: '0.5px' }}>IMAGE</TableCell>

                <TableCell sx={{ color: 'rgba(0,0,0,0.5)', borderBottom: '1px solid #EAEAEA', fontWeight: 600, letterSpacing: '0.5px' }}>NAME</TableCell>

                <TableCell sx={{ color: 'rgba(0,0,0,0.5)', borderBottom: '1px solid #EAEAEA', fontWeight: 600, letterSpacing: '0.5px' }}>CATEGORY</TableCell>

                <TableCell sx={{ color: 'rgba(0,0,0,0.5)', borderBottom: '1px solid #EAEAEA', fontWeight: 600, letterSpacing: '0.5px' }}>TAG</TableCell>

                <TableCell align="right" sx={{ color: 'rgba(0,0,0,0.5)', borderBottom: '1px solid #EAEAEA', fontWeight: 600, letterSpacing: '0.5px' }}>PRICE</TableCell>

                <TableCell align="center" sx={{ color: 'rgba(0,0,0,0.5)', borderBottom: '1px solid #EAEAEA', fontWeight: 600, letterSpacing: '0.5px' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>

                  <TableCell colSpan={6} align="center"
                    sx={{ color: 'rgba(0,0,0,0.4)', py: 4 }}>
                    Loading products...</TableCell>

                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center"
                    sx={{ color: 'rgba(0,0,0,0.4)', py: 4 }}>
                    No luxury items found.</TableCell>
                </TableRow>
              ) : products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>

                  <TableCell sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Avatar variant="square"
                      src={getImageUrl(product.imageUrl)}
                      sx={{ width: 55, height: 55, border: '1px solid #EAEAEA', bgcolor: '#FFFFFF' }} />
                  </TableCell>

                  <TableCell sx={{ color: '#111111', fontWeight: 500, borderBottom: '1px solid #EAEAEA' }}>{product.name}</TableCell>
                  <TableCell sx={{ color: 'rgba(0,0,0,0.6)', borderBottom: '1px solid #EAEAEA' }}>{product.category}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Box sx={{ display: 'inline-block', color: '#111111', fontSize: '10px', px: 1, py: 0.2, fontWeight: 600, letterSpacing: '1px' }}>
                      {product.tag}
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#111111', fontWeight: 600, borderBottom: '1px solid #EAEAEA' }}>
                    ${parseFloat(product.price).toFixed(2)}
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <IconButton onClick={() => handleOpenDialog(product)} sx={{ color: '#111111', mr: 1 }}><Edit sx={{ fontSize: 18 }} /></IconButton>
                    <IconButton onClick={() => { setProductToDelete(product); setOpenDeleteConfirm(true); }} sx={{ color: 'rgba(0,0,0,0.3)', '&:hover': { color: '#ff4d4d' } }}><Delete sx={{ fontSize: 18 }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Forms & Fixed Pop-up Dialog Modal */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#FFFFFF',
              color: '#111111',
              borderRadius: 0,
              border: '1px solid #111111',
              p: 1,
              boxShadow: '0px 10px 30px rgba(0,0,0,0.08)'
            }
          }}
        >
          <form onSubmit={handleSaveProduct}>
            <DialogTitle sx={{ letterSpacing: '0.5px', fontWeight: 500, color: '#111111', bgcolor: '#FFFFFF' }}>
              {editingProduct ? 'Edit Luxury Item' : 'Add New Luxury Item'}
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: '#EAEAEA', bgcolor: '#FFFFFF' }}>
              <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Product Name" name="name" value={form.name} onChange={handleInputChange} required sx={textFieldLightStyle} />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    required
                    sx={textFieldLightStyle}
                    SelectProps={SELECT_MENU_PROPS}
                  >
                    {CATEGORIES.map(cat => <MenuItem key={cat} value={cat} sx={{ color: '#111111' }}>{cat}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Tag"
                    name="tag"
                    value={form.tag}
                    onChange={handleInputChange}
                    required
                    sx={textFieldLightStyle}
                    SelectProps={SELECT_MENU_PROPS}
                  >
                    {TAGS.map(tag => <MenuItem key={tag} value={tag} sx={{ color: '#111111' }}>{tag}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Price ($)" name="price" type="number" value={form.price} onChange={handleInputChange} required sx={textFieldLightStyle} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Discount (%)" name="discount" type="number" value={form.discount} onChange={handleInputChange} sx={textFieldLightStyle} />
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ border: '1px dashed rgba(0,0,0,0.15)', borderRadius: 0, p: 3, textAlign: 'center', bgcolor: '#FAFAFA', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <input accept="image/*" style={{ display: 'none' }} id="file-upload" type="file" onChange={handleImageChange} />
                    <label htmlFor="file-upload">
                      <Button component="span" variant="text" startIcon={<CloudUpload />} sx={{ color: '#111111', letterSpacing: '0.5px', fontWeight: 600, fontSize: '12px' }}>MAIN IMAGE</Button>
                    </label>
                    {imagePreview && <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}><Avatar variant="square" src={imagePreview} sx={{ width: 90, height: 90, border: '1px solid #111111' }} /></Box>}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ border: '1px dashed rgba(0,0,0,0.15)', borderRadius: 0, p: 3, textAlign: 'center', bgcolor: '#FAFAFA', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <input accept="image/*" style={{ display: 'none' }} id="hover-file-upload" type="file" onChange={handleHoverImageChange} />
                    <label htmlFor="hover-file-upload">
                      <Button component="span" variant="text" startIcon={<CloudUpload />} sx={{ color: '#111111', letterSpacing: '0.5px', fontWeight: 600, fontSize: '12px' }}>HOVER IMAGE</Button>
                    </label>
                    {hoverImagePreview && <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}><Avatar variant="square" src={hoverImagePreview} sx={{ width: 90, height: 90, border: '1px solid #111111' }} /></Box>}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2.5, bgcolor: '#FFFFFF' }}>
              <Button onClick={() => setOpenDialog(false)} sx={{ color: 'rgba(0,0,0,0.4)', letterSpacing: '0.5px' }}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ color: '#FFFFFF', bgcolor: '#111111', borderRadius: 0, px: 3, boxShadow: 'none', '&:hover': { bgcolor: '#333333', boxShadow: 'none' } }}>Save Item</Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)} PaperProps={{ sx: { bgcolor: '#FFFFFF', color: '#111111', borderRadius: 0, border: '1px solid #ff4d4d' } }}>
          <DialogTitle sx={{ color: '#ff4d4d', letterSpacing: '0.5px' }}>Remove Item?</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>Are you sure you want to permanently remove "{productToDelete?.name}" from the inventory catalog?</Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenDeleteConfirm(false)} sx={{ color: 'rgba(0,0,0,0.4)' }}>Cancel</Button>
            <Button onClick={handleConfirmDelete} variant="contained" color="error" sx={{ borderRadius: 0, boxShadow: 'none' }}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

// Input Field Custom Premium Light Look Styles
const textFieldLightStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    bgcolor: '#FFFFFF',
    '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#111111' },
    '& input': { color: '#111111' },
  },
  '& .MuiInputBase-root': {
    bgcolor: '#FFFFFF',
    color: '#111111',
  },
  '& .MuiInputLabel-root': { color: 'rgba(0, 0, 0, 0.5)', letterSpacing: '0.5px' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#111111' },
  '& .MuiSelect-select': {
    color: '#111111',
    textAlign: 'left',
    bgcolor: '#FFFFFF',
  },
  '& .MuiOutlinedInput-root .MuiSelect-icon': {
    color: '#111111',
  },
};

export default Dashboard;