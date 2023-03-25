import React from "react";
import {
	background,
	Button,
	Center,
	Image,
	Td,
	Text,
	Tooltip,
	Tr,
	useColorMode,
} from '@chakra-ui/react';
import type { ProductType } from '../types/product';

function ProductItem(product: ProductType) {
	const { colorMode } = useColorMode();

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
			<Td maxW='3xs'>
				<Text
					overflow='hidden'
					textOverflow='ellipsis'
					whiteSpace='nowrap'
					lineHeight='1.5rem'
					title={product.title}
				>
					{product.title}
				</Text>
			</Td>
			<Td maxW='sm'>
				<Tooltip label={product.description} openDelay={200}>
					<Text
						overflow='hidden'
						textOverflow='ellipsis'
						whiteSpace='nowrap'
						lineHeight='1.5rem'
					>
						{product.description}
					</Text>
				</Tooltip>
			</Td>
			<Td textAlign='center'>{product.price}</Td>
			<Td
				_hover={{
					':hover img': {
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
			<Td>{product.category}</Td>
			<Td>
				<Button colorScheme='teal' size='sm'>
					Details
				</Button>
			</Td>
			<Td>
				<Button colorScheme='red' size='sm'>
					Delete
				</Button>
			</Td>
		</Tr>
	);
}

export default ProductItem;
