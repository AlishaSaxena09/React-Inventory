import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface ProductCardProps {
  prod: any;
}

export function ProductCard({ prod }: ProductCardProps): React.JSX.Element {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar src={prod?.id} variant="square" />
          </Box>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {prod?.name} ${prod.price}
            </Typography>
            <Typography align="center" variant="h5">
              {prod.company?.name}
            </Typography>
            <Typography align="center" variant="body1">
              {prod?.minimum_stock}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
