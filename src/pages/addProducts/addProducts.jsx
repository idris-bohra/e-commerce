import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { productCategory } from '../../enums/productCategory';
import { addProduct, deleteProduct, updateProduct } from '../../store/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard from '../../components/customCard/customCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const productInitialState = { name: '', price: '', category: null, availability: '' };

export default function AddProducts() {

    const products = useSelector((state) => state.products)

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [productDetails, setProductDetails] = useState(productInitialState);
    const [editedIndex, setEditedIndex] = useState(null);

    const validateForm = () => {
        const { name, price, category, availability } = productDetails;
        if (!name || name.length < 3) {
            alert("Name must be at least 3 characters long.");
            return false;
        }
        if (!price || isNaN(price) || Number(price) <= 0) {
            alert("Price must be a positive number greater than 0.");
            return false;
        }
        if (category === null) {
            alert("Category must be selected.");
            return false;
        }
        if (availability === '' || isNaN(availability) || Number(availability) < 0) {
            alert("Availability must be a non-negative number.");
            return false;
        }
        return true;
    }

    const handleClose = () => {
        setOpenModal(false);
        setEditedIndex(null);
        setProductDetails(productInitialState);
    }

    const handleOpenModal = () => setOpenModal(true);

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }
        if (editedIndex != null) {
            dispatch(updateProduct({ product: productDetails, index: editedIndex }));
        }
        else {
            dispatch(addProduct({ product: productDetails }));
        }
        handleClose();
    }

    const handleCategoryChange = (event) => {
        setProductDetails((prev) => {
            return { ...prev, 'category': event?.target?.value }
        })
    }

    const handleDelete = (index) => {
        dispatch(deleteProduct({ index }))
    }

    const handleValueChange = (e, slug) => {
        setProductDetails((prev) => {
            return { ...prev, [slug]: e?.currentTarget?.value }
        })
    }

    const handleEditProduct = (index, product) => {
        setEditedIndex(index);
        setProductDetails(product);
        setOpenModal(true);
    }

    const ShowProducts = () => {
        return (
            products.map((product, index) => {
                return <CustomCard showActions={true} product={product} index={index} handleEditProduct={handleEditProduct} handleDelete={handleDelete} />
            })
        )
    }

    return (
        <>
            <Box className='hello' sx={{ display: products.length === 0 ? 'flex' : "none", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                <Button variant="contained" sx={{ marginLeft: '16px' }} onClick={handleOpenModal}>Create New Product</Button>
            </Box>
            <Box sx={{ display: products.length === 0 ? 'none' : "flex", justifyContent: 'start', alignItems: 'center', flexWrap: 'wrap', padding: '24px' }}>
                <Button variant="contained" onClick={handleOpenModal}>Create New Product</Button>
            </Box>
            <Box sx={{ display: products.length === 0 ? 'none' : "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', padding: '8px' }}>
                <ShowProducts />
            </Box>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" sx={{ margin: '14px' }} gutterBottom>{editedIndex != null ? 'Update Product' : 'Create Product'}</Typography>
                    <TextField value={productDetails?.name} onChange={(e) => handleValueChange(e, 'name')} sx={{ display: 'flex', flexDirection: 'column', margin: '14px' }} id="outlined-basic" label="Product Name" variant="outlined" />
                    <TextField value={productDetails?.price} onChange={(e) => handleValueChange(e, 'price')} sx={{ display: 'flex', flexDirection: 'column', margin: '14px' }} id="outlined-basic" label="Price" variant="outlined" />
                    <FormControl sx={{ display: 'flex', flexDirection: 'column', margin: '14px', width: '100' }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productDetails?.category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            {productCategory.map((category, index) => {
                                return <MenuItem key={index} value={category}>{category}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField value={productDetails?.availability} onChange={(e) => handleValueChange(e, 'availability')} sx={{ display: 'flex', flexDirection: 'column', margin: '14px' }} id="outlined-basic" label="Availability" variant="outlined" />
                    <Button variant="contained" sx={{ marginTop: '14px', marginLeft: '14px' }} onClick={handleSave}>{editedIndex != null ? 'Update' : 'Save Product'}</Button>
                    <Button variant="outlined" sx={{ marginTop: '14px', marginLeft: '7px' }} onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>
        </>
    )
}