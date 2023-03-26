import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProductType } from '../../types/product';

export const productApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getPosts: builder.query<{ products: ProductType[] }, void>({
			query: () => ({ url: 'products' }),
			providesTags: (result) =>
				result
					? [
							...result.products.map(({ id }) => ({
								type: 'Products' as const,
								id,
							})),
							'Products',
					  ]
					: ['Products'],
		}),
		addPost: builder.mutation<
			ProductType,
			{ product: Omit<ProductType, 'id' | 'deletedOn' | 'isDeleted'> }
		>({
			query: (body) => ({
				url: `products/add`,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		deletePost: builder.mutation<ProductType, number>({
			query(id) {
				return {
					url: `products/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: (product) => [{ type: 'Products', id: product?.id }],
		}),
	}),
});

export const { useGetPostsQuery, useDeletePostMutation, useAddPostMutation } =
	productApi;
