import React from 'react';
import { useGetPostsQuery } from '../store/services/products';
import ProductItem from './ProductItem';
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

function ProductsList() {
	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
	const { data, error, isLoading } = useGetPostsQuery();
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
					<Tr>
						<Th paddingX='0' textAlign='center'>
							ID
						</Th>
						<Th pl='0'>Title</Th>
						<Th pl='0'>Description</Th>
						<Th pl='0' textAlign='center'>
							Price
						</Th>
						<Th pl='0' textAlign='center'>
							Photo
						</Th>
						<Th pl='0' textAlign='center'>
							Rating
						</Th>
						<Th pl='0' textAlign='center'>
							Stock
						</Th>
						<Th pl='0'>Category</Th>
						<Th pl='0'></Th>
						<Th pl='0'></Th>
					</Tr>
				</Thead>
				<Tbody>
					{data?.products.map((product) => (
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
