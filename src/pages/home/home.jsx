import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomCard from '../../components/customCard/customCard';
import { categorizeProducts } from '../../utility/common';
import { useSelector } from 'react-redux';

export default function Home() {

  const products = useSelector((state) => state.products);

  const [categorizedProducts, setCategorizedProducts] = useState({});

  useEffect(() => {
    setCategorizedProducts(categorizeProducts(products))
  }, [products])


  return (
    <Box sx={{ padding: '12px' }}>
      {Object.keys(categorizedProducts)?.map((category) => {
        return (
          <Box sx={{ marginTop: '24px' }}>
            <Typography sx={{ marginLeft: '6px' }} variant="h4" gutterBottom>{category}</Typography>
            <Box sx={{ display: "flex", justifyContent: 'start', alignItems: 'center', flexWrap: 'wrap', width: '100' }}>
              {categorizedProducts?.[category]?.map((product) => { return <CustomCard product={product} showActions={false} index={product.index} /> })}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}