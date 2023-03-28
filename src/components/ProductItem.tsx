import React from "react";
import { Link as ReactRouterLink, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { deleteProduct } from "../store/productsSlice";
import { useDeletePostMutation } from "../store/services/products";
import ProductItemTextField from "./ProductItemTextField";
import {
	Button,
	Center,
	Highlight,
	Image,
	Link,
	Td,
	Tr,
	useColorMode,
} from '@chakra-ui/react';
import type { ProductType } from '../types/product';

function ProductItem(product: ProductType) {
	if (product.isDeleted) {
		return null;
	}

	const [searchParams] = useSearchParams();
	const query = searchParams.get('search') ?? '';

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
				<Highlight query={query} styles={{ py: '1', bg: 'orange.100' }}>
					{product.id.toString()}
				</Highlight>
			</Td>

			<Td>
				<ProductItemTextField width='8rem' category={product.title} />
			</Td>
			<Td>
				<ProductItemTextField width='15rem' category={product.description} />
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
				<ProductItemTextField width='8rem' category={product.category} />
			</Td>
			<Td>
				<Button colorScheme='teal' size='sm'>
					<Link as={ReactRouterLink} to={`product/${product.id}`}>
						Details
					</Link>
				</Button>
			</Td>
			<Td>
				<Button
					isLoading={isLoading}
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
