import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { "name": "Product 1", "price": "100", "category": "Electric", "availability": "50" },
  { "name": "Product 2", "price": "200", "category": "Clothes", "availability": "30" },
  { "name": "Product 3", "price": "150", "category": "Home & Kitchen", "availability": "20" },
  { "name": "Product 4", "price": "250", "category": "Books", "availability": "40" },
  { "name": "Product 5", "price": "300", "category": "Toys & Games", "availability": "60" },
  { "name": "Product 6", "price": "350", "category": "Health & Beauty", "availability": "70" },
  { "name": "Product 7", "price": "400", "category": "Sports & Outdoors", "availability": "80" },
  { "name": "Product 8", "price": "450", "category": "Automotive", "availability": "90" },
  { "name": "Product 9", "price": "500", "category": "Jewelry", "availability": "100" },
  { "name": "Product 10", "price": "550", "category": "Office Supplies", "availability": "110" },
  { "name": "Product 11", "price": "600", "category": "Pet Supplies", "availability": "120" },
  { "name": "Product 12", "price": "650", "category": "Garden & Outdoor", "availability": "130" },
  { "name": "Product 13", "price": "700", "category": "Music & Instruments", "availability": "140" },
  { "name": "Product 14", "price": "750", "category": "Movies & TV", "availability": "150" },
  { "name": "Product 15", "price": "800", "category": "Grocery", "availability": "160" },
  { "name": "Product 16", "price": "850", "category": "Baby Products", "availability": "170" },
  { "name": "Product 17", "price": "900", "category": "Shoes", "availability": "180" },
  { "name": "Product 18", "price": "950", "category": "Tools & Home Improvement", "availability": "190" },
  { "name": "Product 19", "price": "1000", "category": "Video Games", "availability": "200" },
  { "name": "Product 20", "price": "1050", "category": "Furniture", "availability": "210" },
  { "name": "Product 21", "price": "1100", "category": "Electric", "availability": "220" },
  { "name": "Product 22", "price": "1150", "category": "Clothes", "availability": "230" },
  { "name": "Product 23", "price": "1200", "category": "Home & Kitchen", "availability": "240" },
  { "name": "Product 24", "price": "1250", "category": "Books", "availability": "250" },
  { "name": "Product 25", "price": "1300", "category": "Toys & Games", "availability": "260" },
  { "name": "Product 26", "price": "1350", "category": "Health & Beauty", "availability": "270" },
  { "name": "Product 27", "price": "1400", "category": "Sports & Outdoors", "availability": "280" },
  { "name": "Product 28", "price": "1450", "category": "Automotive", "availability": "290" },
  { "name": "Product 29", "price": "1500", "category": "Jewelry", "availability": "300" },
  { "name": "Product 30", "price": "1550", "category": "Office Supplies", "availability": "310" },
  { "name": "Product 31", "price": "1600", "category": "Pet Supplies", "availability": "320" },
  { "name": "Product 32", "price": "1650", "category": "Garden & Outdoor", "availability": "330" },
  { "name": "Product 33", "price": "1700", "category": "Music & Instruments", "availability": "340" },
  { "name": "Product 34", "price": "1750", "category": "Movies & TV", "availability": "350" },
  { "name": "Product 35", "price": "1800", "category": "Grocery", "availability": "360" },
  { "name": "Product 36", "price": "1850", "category": "Baby Products", "availability": "370" },
  { "name": "Product 37", "price": "1900", "category": "Shoes", "availability": "380" },
  { "name": "Product 38", "price": "1950", "category": "Tools & Home Improvement", "availability": "390" },
  { "name": "Product 39", "price": "2000", "category": "Video Games", "availability": "400" },
  { "name": "Product 40", "price": "2050", "category": "Furniture", "availability": "410" },
  { "name": "Product 41", "price": "2100", "category": "Electric", "availability": "420" },
  { "name": "Product 42", "price": "2150", "category": "Clothes", "availability": "430" },
  { "name": "Product 43", "price": "2200", "category": "Home & Kitchen", "availability": "440" },
  { "name": "Product 44", "price": "2250", "category": "Books", "availability": "450" },
  { "name": "Product 45", "price": "2300", "category": "Toys & Games", "availability": "460" },
  { "name": "Product 46", "price": "2350", "category": "Health & Beauty", "availability": "470" },
  { "name": "Product 47", "price": "2400", "category": "Sports & Outdoors", "availability": "480" },
  { "name": "Product 48", "price": "2450", "category": "Automotive", "availability": "490" },
  { "name": "Product 49", "price": "2500", "category": "Jewelry", "availability": "500" },
  { "name": "Product 50", "price": "2550", "category": "Office Supplies", "availability": "510" }
];

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload.product);
      return state;
    },
    deleteProduct: (state, action) => {
      const index = action.payload.index;
      if (index >= 0 && index < state.length) {
        state.splice(index, 1);
      }
      return state;
    },
    updateProduct: (state, action) => {
      const { index, product } = action.payload;
      if (index >= 0 && index < state.length) {
        state[index] = product;
      }
      return state;
    },
  },
})

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions

export default productSlice.reducer