"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Modal,
} from "@mui/material";
import { ProductCard } from "@/components/dashboard/products/products-card";

export default function Page(): React.JSX.Element {
  const [productsSet, setProductsSet] = React.useState([]);
  const [isAddForm, setIsAddForm] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/products`
        );
        setProductsSet(response.data.data);
      } catch (error) {
        console.error("Error fetching company data", error);
      }
    };

    fetchProducts();
  }, []);

  const openAddForm = () => {
    setIsAddForm((prev) => !prev);
  };

  const handleProductChange = (e: any) => {
    const { name, value } = e.target;
    setProductDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/products`,
        productDetails
      );
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error fetching company data", error);
    }

    setIsAddForm(false);
  };

  // const addProducts = () => {
  //   setProductsSet((prev: any) => {
  //     return [...prev, productDetails];
  //   });

  //   setIsAddForm(false);

  //   console.log(productDetails);
  // };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4" color="#fff">
            Products
          </Typography>
        </Stack>
        <div>
          <Button
            onClick={openAddForm}
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack>
      <Grid container spacing={3}>
        {productsSet?.map((prod: any) => (
          <Grid key={prod.id} lg={4} md={6} xs={12}>
            <ProductCard prod={prod} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={3} size="small" />
      </Box>

      {isAddForm && (
        <Modal
          open={isAddForm}
          onClose={openAddForm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            display={"flex"}
            justifyContent="center"
            flexDirection="column"
            gap="1.4rem"
          >
            <div style={{ width: "100%" }}>
              <InputLabel htmlFor="name">Product Name</InputLabel>
              <Input
                onChange={handleProductChange}
                name="name"
                value={productDetails.name}
                fullWidth
                id="name"
                aria-describedby="my-helper-text"
              />
            </div>
            <div>
              <InputLabel htmlFor="price">Product Price</InputLabel>
              <Input
                onChange={handleProductChange}
                name="price"
                value={productDetails.price}
                fullWidth
                id="price"
                aria-describedby="my-helper-text"
              />
            </div>
            <div>
              <InputLabel htmlFor="brand">Product Brand</InputLabel>
              <Input
                onChange={handleProductChange}
                name="brand"
                value={productDetails.brand}
                fullWidth
                id="brand"
                aria-describedby="my-helper-text"
              />
            </div>
            <div>
              <InputLabel htmlFor="category">Product Category</InputLabel>
              <Input
                onChange={handleProductChange}
                name="category"
                value={productDetails.category}
                fullWidth
                id="category"
                aria-describedby="my-helper-text"
              />
            </div>
            <Button onClick={addProduct} variant="contained">
              Add
            </Button>
          </Box>
        </Modal>
      )}
    </Stack>
  );
}
