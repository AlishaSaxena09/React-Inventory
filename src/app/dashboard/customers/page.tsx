'use client';

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import axios from 'axios';

import { CustomersTable } from '@/components/dashboard/customer/customers-table';

export default function Page(): React.JSX.Element {
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint.com/customers');
        setCustomer(response.data.data);
      } catch (error) {
        console.error('Error fetching company data', error);
      }
    };

    fetchCustomers();
  }, []);

  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customer, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4" color="#fff">
            Customers
          </Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: any, page: number, rowsPerPage: number): any {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
