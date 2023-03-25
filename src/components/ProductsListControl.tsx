import { Th, Tr } from "@chakra-ui/react";
import React from "react";
import { ProductType } from "../types/product";

type ProductsListControlProps = {
	handleSort: (value: keyof ProductType) => void;
	colorMode: 'light' | 'dark';
	currSortBy: keyof ProductType;
	sortOrder: 'asc' | 'desc';
};

function ProductsListControl({
	handleSort,
	colorMode,
	currSortBy,
	sortOrder,
}: ProductsListControlProps) {
	return (
		<Tr>
			<Th
				transition='background 0.3s'
				paddingX='0'
				textAlign='center'
				onClick={() => handleSort('id')}
				_hover={{
					bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
					cursor: 'pointer',
				}}
			>
				ID{' '}
				{currSortBy === 'id' &&
					(sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
			</Th>
			<Th
				transition='background 0.3s'
				onClick={() => handleSort('title')}
				_hover={{
					bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
					cursor: 'pointer',
				}}
			>
				Title{' '}
				{currSortBy === 'title' &&
					(sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
			</Th>
			<Th
				transition='background 0.3s'
				onClick={() => handleSort('description')}
				_hover={{
					bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
					cursor: 'pointer',
				}}
			>
				Description{' '}
				{currSortBy === 'description' &&
					(sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
			</Th>
			<Th
				textAlign='center'
				transition='background 0.3s'
				onClick={() => handleSort('price')}
				_hover={{
					bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
					cursor: 'pointer',
				}}
			>
				Price{' '}
				{currSortBy === 'price' &&
					(sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
			</Th>
			<Th textAlign='center'>Photo</Th>
			<Th
				textAlign='center'
				transition='background 0.3s'
				onClick={() => handleSort('rating')}
				_hover={{
					bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
					cursor: 'pointer',
				}}
			>
				Rating{' '}
				{currSortBy === 'rating' &&
					(sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
			</Th>
			<Th
				textAlign='center'
				transition='background 0.3s'
				onClick={() => handleSort('stock')}
				_hover={{
					bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
					cursor: 'pointer',
				}}
			>
				Stock{' '}
				{currSortBy === 'stock' &&
					(sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
			</Th>
			<Th
				transition='background 0.3s'
				onClick={() => handleSort('category')}
				_hover={{
					bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
					cursor: 'pointer',
				}}
			>
				Category{' '}
				{currSortBy === 'category' &&
					(sortOrder === 'asc' ? <>&uarr;</> : <>&darr;</>)}
			</Th>
			<Th></Th>
			<Th></Th>
		</Tr>
	);
}

export default ProductsListControl;
