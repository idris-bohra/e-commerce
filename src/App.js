import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Products from './pages/products/products';
import AddProducts from './pages/addProducts/addProducts';
import Navbar from './components/navbar/navbar';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ProductPreview from './pages/productPreview/productPreview'
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#131010',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/product-preview/:id" element={<ProductPreview />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;