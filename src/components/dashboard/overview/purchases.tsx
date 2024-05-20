import * as React from 'react';
import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

export interface PurchasesProps {
  sx?: SxProps;
  purchases: any;
}

export function Purchases({ purchases, sx }: PurchasesProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Purchases
            </Typography>
            <Typography variant="h4">{purchases.length} %</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: '#0047AB', height: '56px', width: '56px' }}>
            <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
        <div style={{ marginTop: '2rem' }}>
          <LinearProgress value={purchases.length} variant="determinate" />
        </div>
      </CardContent>
    </Card>
  );
}
