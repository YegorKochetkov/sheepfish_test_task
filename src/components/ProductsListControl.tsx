import { HTMLChakraProps, Th, useColorMode } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ProductType } from '../types/product';
import { DataSortContext } from './ProductsList';

type ProductsListControlProps = HTMLChakraProps<'th'> & {
	field: keyof ProductType;
};

function ProductsListControl({
	field,
	...otherProps
}: ProductsListControlProps) {
	const { colorMode } = useColorMode();
	const dataSort = useContext(DataSortContext);

	return (
		<Th
			{...otherProps}
			transition='background 0.3s'
			onClick={() => dataSort?.handleSort(field)}
			_hover={{
				bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
				cursor: 'pointer',
			}}
		>
			{field}{' '}
			{dataSort?.currSortBy === field &&
				(dataSort?.sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
		</Th>
	);
}

export default ProductsListControl;
