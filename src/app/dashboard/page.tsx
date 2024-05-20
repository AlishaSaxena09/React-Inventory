'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
// import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Companies } from '@/components/dashboard/overview/companies';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { LatestOrders } from '@/components/dashboard/overview/latest-purchases';
import { Products } from '@/components/dashboard/overview/products';
import { Purchases } from '@/components/dashboard/overview/purchases';
import { Sales } from '@/components/dashboard/overview/sales';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { Traffic } from '@/components/dashboard/overview/traffic';

export default function Page(): React.JSX.Element {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint.com/products');
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data', error);
        setLoading(false);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint.com/companies');
        setCompanies(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data', error);
        setLoading(false);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint.com/customers');
        setCustomers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data', error);
        setLoading(false);
      }
    };

    const fetchPurchases = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint.com/purchases');
        setPurchases(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data', error);
        setLoading(false);
      }
    };
    console.log('first', products);
    console.log('first', companies);
    console.log('first', customers);
    console.log('first', purchases);

    fetchProducts();
    fetchCompanies();
    fetchCustomers();
    fetchPurchases();
  }, []);

  return (
    <Grid container spacing={3} bgcolor="#008080" padding="16px" margin="16px" borderRadius="12px">
      <Grid lg={3} sm={6} xs={12}>
        <Products products={products} diff={12} trend="up" sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers customers={customers} diff={16} trend="down" sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Companies companies={companies} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Purchases sx={{ height: '100%' }} purchases={purchases} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Sales', 'Companies', 'Purchases']} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestProducts products={products} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestOrders purchases={purchases} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
