import { useState, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import Banner from '../componets/Banner';
import banner from '../assets/earrings.webp';
import FilterSidebar from '../componets/Filtersidebar';
import Product from '../componets/Product';

export default function EarringCategoryPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.products || []));
    }, []);

    const earringProducts = products.filter(p => p.category === 'Earrings');

    return (
        <Box sx={{ width: '100%', bgcolor: '#fff' }}>

            {/* TOP HEADER BANNER */}
            <Banner title="Earrings" image={banner} />

            <Container maxWidth="xl" sx={{ mt: 5 }}>
                <Grid container spacing={4}>

                    {/* LEFT SIDEBAR FILTERS (DESIGN FROM VIDEO) */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <FilterSidebar />
                    </Grid>

                    {/* RIGHT PRODUCT CATALOG GRID */}
                    <Product products={earringProducts} />

                </Grid>
            </Container>
        </Box>
    );
}