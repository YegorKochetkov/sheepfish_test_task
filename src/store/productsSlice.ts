import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { ProductType } from '../types/product';

type ProductsState = {
	allProducts: ProductType[];
};

const initialState: ProductsState = {
	allProducts: [],
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<ProductType>) => {
			state.allProducts.push(action.payload);
		},
		updateProduct: (state, action: PayloadAction<ProductType>) => {
			state.allProducts.forEach((product) => {
				if (product.id === action.payload.id) {
					product = action.payload;
				}
			});
		},
		deleteProduct: (state, action: PayloadAction<number>) => {
			state.allProducts = state.allProducts.filter(
				(product) => product.id !== action.payload
			);
		},
	},
});

export const { addProduct, updateProduct, deleteProduct } =
	productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.allProducts;
export const selectProduct = (
	state: RootState,
	action: PayloadAction<number>
) =>
	state.products.allProducts.filter((product) => product.id === action.payload);

export default productsSlice.reducer;
