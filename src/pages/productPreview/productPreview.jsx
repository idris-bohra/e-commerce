import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid2, Card, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomCard from '../../components/customCard/customCard';
import { searchProducts } from '../../utility/common';

export default function ProductPreview() {

    const { id } = useParams();

    const products = useSelector((state) => state.products);

    const [product, setProduct] = useState(products[id]);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        setProduct(products[id]);
        const categoryWiseProduct = searchProducts({ products, searchValue: '', minPrice: null, maxPrice: null, category: product?.category });
        setRelatedProducts(categoryWiseProduct);
    }, [id])

    return (
        <Box sx={{ padding: '12px' }}>
            <Grid2 container spacing={4}>
                <Grid2 item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{ width: { xs: '100vw', md: '50vw' }, height: 'auto' }}
                            image="https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_3000,f_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/b3460ec0-6a8a-11ea-9a43-8a541dae4315.jpg"
                            alt={product?.name}
                        />
                    </Card>
                </Grid2>
                <Grid2 item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>{product?.name}</Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom>{product?.price}rs</Typography>
                    <Typography variant="body1" paragraph>{product?.description}</Typography>
                    <Button variant="contained" color="primary" sx={{ marginRight: '16px' }}>Add to Cart</Button>
                    <Button variant="contained" color="secondary">Buy Now</Button>
                </Grid2>
            </Grid2>

            <Box sx={{ marginTop: '40px' }}>
                <Typography variant="h5" gutterBottom>You might be interested in</Typography>
                <Grid2 container spacing={2}>
                    {relatedProducts?.map((relatedProduct) => (
                        <Grid2 item xs={12} sm={6} md={4}>
                            <CustomCard product={relatedProduct} index={relatedProduct?.index} showAction={false} />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    );
}