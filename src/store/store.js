import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("reduxState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.error("Failed to load state", error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState", serializedState);
    } catch (error) {
        console.error("Failed to save state", error);
    }
};

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        products: productSlice
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});