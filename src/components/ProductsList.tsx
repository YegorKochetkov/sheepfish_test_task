import React from "react";
import useDataSort from "../hooks/useDataSort";
import { useGetPostsQuery } from "../store/services/products";
import ProductItem from "./ProductItem";
import ProductsListControl from "./ProductsListControl";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	TableContainer,
	Center,
	useMediaQuery,
	useColorMode,
} from '@chakra-ui/react';

function ProductsList() {
	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
	const { colorMode } = useColorMode();
	const { data, error, isLoading } = useGetPostsQuery();
	const { sortedData, sortOrder, handleSort, currSortBy } = useDataSort(
		data?.products,
		'id'
	);
	let errorMessage: null | string = null;

	if (error) {
		if ('status' in error) {
			const errMsg = 'data' in error ? JSON.stringify(error.data) : error.error;

			errorMessage = `Error: ${errMsg}.`;
		} else {
			errorMessage = error.message ?? 'undefine error';
		}
	}

	if (errorMessage) return <Center>errorMessage?.toUpperCase()</Center>;

	if (isLoading) return <Center>Loading...</Center>;

	return (
		<TableContainer mb='5rem'>
			<Table variant='simple' size={isLargerThan1280 ? 'md' : 'sm'}>
				<Thead>
					<ProductsListControl
						handleSort={handleSort}
						colorMode={colorMode}
						currSortBy={currSortBy}
						sortOrder={sortOrder}
					/>
				</Thead>
				<Tbody>
					{sortedData.map((product) => (
						<ProductItem key={product.id} {...product} />
					))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th>prev</Th>
						<Th>pages</Th>
						<Th>next</Th>
					</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	);
}

export default ProductsList;
