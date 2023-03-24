import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
	}),
});

export const { useGetPostsQuery } = productApi;
