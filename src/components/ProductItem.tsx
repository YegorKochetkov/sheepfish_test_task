import { Button, Center, Image, Td, Tr, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { deleteProduct } from '../store/productsSlice';
import { useDeletePostMutation } from '../store/services/products';
import ProductItemTextField from './ProductItemTextField';
import type { ProductType } from '../types/product';

function ProductItem(product: ProductType) {
	if (product.isDeleted) {
		return null;
	}

	const { colorMode } = useColorMode();
	const dispatch = useAppDispatch();
	const [deletePost, { isLoading }] = useDeletePostMutation();

	const handleDeleteProducts = async (id: number) => {
		const response = await deletePost(id);

		if ('data' in response) {
			dispatch(deleteProduct(response.data));
		}
	};

	return (
		<Tr
			transition='background 0.3s'
			key={product.id}
			_hover={{
				outline: '1px solid gray',
				bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
			}}
		>
			<Td paddingX='0' textAlign='center'>
				{product.id}
			</Td>

			<Td>
				<ProductItemTextField maxWidth='10rem' category={product.title} />
			</Td>
			<Td>
				<ProductItemTextField maxWidth='15rem' category={product.description} />
			</Td>
			<Td textAlign='center'>{product.price}</Td>
			<Td
				_hover={{
					img: {
						width: '10rem',
						height: 'auto',
						'z-index': '10',
					},
				}}
			>
				<Center>
					<Image
						position='absolute'
						width='3em'
						height='3em'
						objectFit='cover'
						src={product.thumbnail}
						alt={product.title}
						transition='width 0.3s'
					/>
				</Center>
			</Td>
			<Td textAlign='center'>{product.rating}</Td>
			<Td textAlign='center'>{product.stock}</Td>
			<Td>
				<ProductItemTextField maxWidth='10rem' category={product.category} />
			</Td>
			<Td>
				<Button colorScheme='teal' size='sm'>
					Details
				</Button>
			</Td>
			<Td>
				<Button
					opacity={isLoading ? '0.2' : '1'}
					cursor={isLoading ? 'inherit' : 'pointer'}
					colorScheme='red'
					size='sm'
					onClick={() => handleDeleteProducts(product.id)}
					disabled={isLoading}
				>
					Delete
				</Button>
			</Td>
		</Tr>
	);
}

export default ProductItem;
