import React, { useEffect, useState } from 'react';
import { Box, Drawer, IconButton, MenuItem, Select, Slider, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import CustomCard from '../../components/customCard/customCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMinMaxPrice, searchProducts } from '../../utility/common';
import { productCategory } from '../../enums/productCategory';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Products() {

  const products = useSelector((state) => state.products);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchValue = decodeURIComponent(queryParams.get('search')) || null;
  const minPrice = queryParams.get('minPrice') || null;
  const maxPrice = queryParams.get('maxPrice') || null;
  const category = decodeURIComponent(queryParams.get('category')) || null;

  const [searchedResults, setSearchedResults] = useState([]);
  const [priceRange, setPriceRange] = useState({ minPrice: minPrice || (getMinMaxPrice(products)?.minPrice || 0), maxPrice: maxPrice || (getMinMaxPrice(products)?.maxPrice || 100) });
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [sortOptions, setSortOptions] = useState([]);

  useEffect(() => {
    setSearchedResults(searchProducts({ products, searchValue, minPrice, maxPrice, category }));
    setSelectedCategory(category);
    setPriceRange({ minPrice: minPrice || (getMinMaxPrice(products)?.minPrice || 0), maxPrice: maxPrice || (getMinMaxPrice(products)?.maxPrice || 100) })
  }, [searchValue, minPrice, maxPrice, category])

  const handlePriceChange = (event, newValue) => {
    setPriceRange({ minPrice: newValue[0], maxPrice: newValue[1] });
    navigate(`/products?search=${encodeURIComponent(searchValue ?? '')}&minPrice=${newValue[0]}&maxPrice=${newValue[1]}&category=${encodeURIComponent(selectedCategory)}`)
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    navigate(`/products?search=${encodeURIComponent(searchValue ?? '')}&minPrice=${priceRange.minPrice}&maxPrice=${priceRange.maxPrice}&category=${encodeURIComponent(event.target.value)}`)
  };

  const handleToggleDrawer = () => {
    setToggleDrawer(!toggleDrawer);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOptions(value);
    sortProducts(value);
  };

  const sortProducts = (criteria) => {
    const sortedResults = [...searchedResults].sort((a, b) => {
      for (let criterion of criteria) {
        if (criterion === 'name') {
          const nameComparison = a.name.localeCompare(b.name);
          if (nameComparison !== 0) return nameComparison;
        } else if (criterion === 'price') {
          const priceComparison = a.price - b.price;
          if (priceComparison !== 0) return priceComparison;
        } else if (criterion === 'availability') {
          const availabilityComparison = a.availability - b.availability;
          if (availabilityComparison !== 0) return availabilityComparison;
        }
      }
      return 0;
    });
    setSearchedResults(sortedResults);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start', alignContent: 'flex-start', padding: '24px' }}>
      <Box sx={{ display: { xs: 'none', md: 'block' }, minWidth: { xs: '200px', sm: '220px', md: '240px', lg: '320px' }, height: '100vh' }}>
        <React.Fragment>
          <Typography variant="h4">Apply Filters</Typography>
          <Box sx={{ marginTop: '16px', display: 'block' }}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={[priceRange.minPrice, priceRange.maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={getMinMaxPrice(products).minPrice}
              max={getMinMaxPrice(products).maxPrice}
            />
          </Box>
          <Box sx={{ marginTop: '16px', display: 'block' }}>
            <Typography gutterBottom>Category</Typography>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value={null}>{'All'}</MenuItem>
              {productCategory.map((category) => <MenuItem value={category}>{category}</MenuItem>)}
            </Select>
          </Box>
          <Box sx={{ marginTop: '16px', display: 'block' }}>
            <Typography gutterBottom>Sort By</Typography>
            <Select
              multiple
              value={sortOptions}
              onChange={handleSortChange}
              displayEmpty
              fullWidth
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="availability">Availability</MenuItem>
            </Select>
          </Box>
        </React.Fragment>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton onClick={handleToggleDrawer}>
          <FilterListIcon />
        </IconButton>
        <Drawer open={toggleDrawer} onClose={handleToggleDrawer}>
          <Box sx={{ minWidth: '280px', padding: '24px' }}>
            <React.Fragment>
              <Typography variant="h4">Apply Filters</Typography>
              <Box sx={{ marginTop: '16px', display: 'block' }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                  value={[priceRange.minPrice, priceRange.maxPrice]}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={getMinMaxPrice(products).minPrice}
                  max={getMinMaxPrice(products).maxPrice}
                />
              </Box>
              <Box sx={{ marginTop: '16px', display: 'block' }}>
                <Typography gutterBottom>Category</Typography>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value={null}>{'All'}</MenuItem>
                  {productCategory.map((category) => <MenuItem value={category}>{category}</MenuItem>)}
                </Select>
              </Box>
              <Box sx={{ marginTop: '16px', display: 'block' }}>
                <Typography gutterBottom>Sort By</Typography>
                <Select
                  multiple
                  value={sortOptions}
                  onChange={handleSortChange}
                  displayEmpty
                  fullWidth
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="availability">Availability</MenuItem>
                </Select>
              </Box>
            </React.Fragment>
          </Box>
        </Drawer>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexWrap: 'wrap', width: '100', padding: '16px' }}>
        {searchedResults.length === 0 ? <Typography variant='h4'>No Results Found</Typography>
          :
          searchedResults.map((product) => {
            return <CustomCard product={product} index={product?.index} showAction={false} />
          })
        }
      </Box>
    </Box>
  )
}