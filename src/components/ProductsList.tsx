import React, { createContext, useState } from "react";
import useDataSort from "../hooks/useDataSort";
import usePagination from "../hooks/usePagination";
import { useGetPostsQuery } from "../store/services/products";
import { ProductType } from "../types/product";
import { Pagination } from "./Pagination";
import ProductItem from "./ProductItem";
import ProductsListControls from "./ProductsListControls";
import {
	Table,
	Thead,
	Tbody,
	TableContainer,
	Center,
	useMediaQuery,
} from '@chakra-ui/react';

type DataSortContextType = {
	sortedItems: ProductType[] | undefined;
	currSortBy: keyof ProductType;
	orderBy: 'asc' | 'desc';
};

export const DataSortContext = createContext<DataSortContextType | null>(null);

function ProductsList() {
	const [isLargerThan1440] = useMediaQuery('(min-width: 1440px)');
	const { error, isLoading } = useGetPostsQuery();
	const { orderBy, currSortBy } = useDataSort();
	const {
		currPage,
		perPageItems,
		visibleItems,
		sortedItems,
		getLink,
		onPerPageChange,
	} = usePagination();

	let errorMessage: null | string = null;

	if (error && 'status' in error) {
		const errMsg = 'data' in error ? JSON.stringify(error.data) : error.error;

		errorMessage = `Error: ${errMsg}.`;
	} else if (error) {
		errorMessage = error.message ?? 'undefine error';
	}

	if (errorMessage) return <Center>errorMessage?.toUpperCase()</Center>;

	if (isLoading) return <Center>Loading...</Center>;

	return (
		<DataSortContext.Provider value={{ sortedItems, orderBy, currSortBy }}>
			<TableContainer marginBottom='5rem'>
				<Table variant='simple' size={isLargerThan1440 ? 'md' : 'sm'}>
					<Thead>
						<ProductsListControls />
					</Thead>
					<Tbody>
						{visibleItems?.map((product) => (
							<ProductItem key={product.id} {...product} />
						))}
					</Tbody>
				</Table>
				<Pagination
					totalPages={sortedItems.length}
					perPage={perPageItems}
					page={currPage}
					getLink={getLink}
					onPerPageChange={onPerPageChange}
				/>
			</TableContainer>
		</DataSortContext.Provider>
	);
}

export default ProductsList;
