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
		setAllProducts: (state, action: PayloadAction<ProductType[]>) => {
			state.allProducts = action.payload;
		},
		addProduct: (state, action: PayloadAction<ProductType>) => {
			state.allProducts.push(action.payload);
		},
		deleteProduct: (state, action: PayloadAction<ProductType>) => {
			const index = state.allProducts.findIndex(
				(post) => post.id === action.payload.id
			);

			if (index !== -1) {
				state.allProducts[index] = action.payload;
			}
		},
	},
});

export const { setAllProducts, addProduct, deleteProduct } =
	productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.allProducts;

export default productsSlice.reducer;
