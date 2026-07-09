import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
export default function Product({ products, categoryBanner }) {
    const getImageUrl = (url) => url?.startsWith('http') ? url : `http://localhost:3000${url}`;

    return (
        <Grid size={{ xs: 12, md: 9 }}>
            {/* Optional Category Inner Banner */}
            {categoryBanner && (
                <Box
                    component='img'
                    src={categoryBanner}
                    sx={{ width: '100%', height: 'auto', mb: 4 }}
                />
            )}

            {products.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                        No luxury products found in this category.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                             <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 0,
                                boxShadow: 'none',
                                border: '1px solid #EAEAEA',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                    transform: 'translateY(-4px)',
                                    '& .main-img': product.hoverImageUrl ? { opacity: 0 } : {},
                                    '& .hover-img': product.hoverImageUrl ? { opacity: 1, transform: 'scale(1.03)' } : {},
                                }
                            }}>
                                {/* Product Tag (e.g., Sale, New) */}
                                {product.tag && (
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 10,
                                        left: 10,
                                        backgroundColor: '#b08b57',
                                        color: '#fff',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        px: 1.5,
                                        py: 0.5,
                                        zIndex: 1,
                                        letterSpacing: '1px'
                                    }}>
                                        {product.tag}
                                    </Box>
                                )}

                                {/* Product Image Wrapper */}
                                <Box sx={{ position: 'relative', pt: '100%', overflow: 'hidden', bgcolor: '#fbfbfb' }}>
                                    {/* Main Image */}
                                    <CardMedia
                                        component="img"
                                        image={getImageUrl(product.imageUrl)}
                                        alt={product.name}
                                        className="main-img"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'opacity 0.4s ease-in-out, transform 0.5s ease',
                                            '&:hover': product.hoverImageUrl ? {} : {
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    />
                                    
                                    {/* Hover Image */}
                                    {product.hoverImageUrl && (
                                        <CardMedia
                                            component="img"
                                            image={getImageUrl(product.hoverImageUrl)}
                                            alt={`${product.name} Hover`}
                                            className="hover-img"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                opacity: 0,
                                                transition: 'opacity 0.4s ease-in-out, transform 0.5s ease',
                                                transform: 'scale(1.0)'
                                            }}
                                        />
                                    )}
                                </Box>

                                {/* Product Info */}
                                <CardContent sx={{ flexGrow: 1, p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.4)', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                                            {product.category}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '15px', color: '#111111', mb: 1, fontFamily: '"Playfair Display", "Roboto", sans-serif' }}>
                                            {product.name}
                                        </Typography>
                                    </Box>

                                    {/* Pricing Structure */}
                                    <Box sx={{ mt: 'auto' }}>
                                        {product.discount ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)' }}>
                                                    ${parseFloat(product.price).toFixed(2)}
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: '#b08b57', fontWeight: 600 }}>
                                                    ${(parseFloat(product.price) * (1 - parseFloat(product.discount) / 100)).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Typography variant="body1" sx={{ color: '#111111', fontWeight: 600 }}>
                                                ${parseFloat(product.price).toFixed(2)}
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
}