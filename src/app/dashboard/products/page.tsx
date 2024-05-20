'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import axios from 'axios';

import { ProductCard } from '@/components/dashboard/products/products-card';

export default function Page(): React.JSX.Element {
  const [productsSet, setProductsSet] = React.useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint.com/products');
        setProductsSet(response.data.data);
      } catch (error) {
        console.error('Error fetching company data', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4" color="#fff">
            Products
          </Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <Grid container spacing={3}>
        {productsSet.map((prod: any) => (
          <Grid key={prod.id} lg={4} md={6} xs={12}>
            <ProductCard prod={prod} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
