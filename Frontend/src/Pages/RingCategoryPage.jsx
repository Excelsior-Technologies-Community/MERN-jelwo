import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardMedia, CardContent ,Grid} from '@mui/material';
import Banner from '../componets/Banner'
import banner from '../assets/ring-banner.webp'
export default function RingCategoryPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.products || []));
    }, []);

    return (
        <Box sx={{ width: '100%', bgcolor: '#fff' }}>

            {/* TOP HEADER BANNER */}
           <Banner title="Ring" image={banner} />

            <Container maxWidth="xl" sx={{ mt: 5 }}>
                <Grid container spacing={4}>

                    {/* LEFT SIDEBAR FILTERS (DESIGN FROM VIDEO) */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{ p: 2, borderRight: '1px solid #eee' }}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>Categories</Typography>
                            <Typography color="secondary" fontWeight="bold">✓ Rings ({products.length})</Typography>
                            <Typography color="text.secondary" mt={1}>Pendants (0)</Typography>
                            <Typography color="text.secondary" mt={1}>Bracelets (0)</Typography>
                        </Box>
                    </Grid>

                    {/* RIGHT PRODUCT CATALOG GRID */}
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Grid container spacing={3}>
                            {products.map((product) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                                    <Card elevation={0} sx={{ bgcolor: 'transparent', textAlign: 'center' }}>

                                        {/* IMAGE FRAME */}
                                        <Box sx={{ bgcolor: '#f9f9f9', aspectRatio: '1/1', position: 'relative' }}>
                                            {product.discount && (
                                                <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'green', color: '#fff', px: 1, fontSize: '11px', zIndex: 2 }}>
                                                    {product.discount}
                                                </Box>
                                            )}
                                            <CardMedia
                                                component="img"
                                                image={`http://localhost:5000${product.imageUrl}`} // Backend से इमेज लोड हो रही है
                                                alt={product.name}
                                                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
                                        </Box>

                                        {/* DETAILS */}
                                        <CardContent sx={{ px: 0 }}>
                                            <Typography variant="caption" color="text.disabled" sx={{ letterSpacing: 1 }}>{product.tag}</Typography>
                                            <Typography variant="body2" fontWeight={600} mt={0.5}>{product.name}</Typography>
                                            <Typography variant="body2" color="text.secondary" mt={0.5}>{product.price}</Typography>
                                        </CardContent>

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}