import React, { createContext } from 'react';
import useDataSort from '../hooks/useDataSort';
import { useGetPostsQuery } from '../store/services/products';
import { ProductType } from '../types/product';
import ProductItem from './ProductItem';
import ProductsListControls from './ProductsListControls';
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
} from '@chakra-ui/react';

type DataSortContextType = {
	handleSort: (value: keyof ProductType) => void;
	sortedData: ProductType[] | undefined;
	currSortBy: keyof ProductType;
	sortOrder: 'asc' | 'desc';
};

export const DataSortContext = createContext<DataSortContextType | null>(null);

function ProductsList() {
	const [isLargerThan1440] = useMediaQuery('(min-width: 1440px)');
	const { error, isLoading } = useGetPostsQuery();
	const { sortedData, sortOrder, handleSort, currSortBy } = useDataSort();

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
		<DataSortContext.Provider
			value={{ sortedData, sortOrder, handleSort, currSortBy }}
		>
			<TableContainer marginBottom='5rem'>
				<Table variant='simple' size={isLargerThan1440 ? 'md' : 'sm'}>
					<Thead>
						<ProductsListControls />
					</Thead>
					<Tbody>
						{sortedData?.map((product) => (
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
		</DataSortContext.Provider>
	);
}

export default ProductsList;
