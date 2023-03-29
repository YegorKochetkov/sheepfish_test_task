import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "./Form/ProductForm";
import Modal from "./Modal";
import Search from "./Search";
import {
	Button,
	Grid,
	Heading,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react';

function Header() {
	const { toggleColorMode, colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { productId } = useParams();

	return (
		<Grid
			templateColumns='1fr 1fr min-content min-content'
			gap={6}
			marginTop={6}
		>
			<Heading minWidth='fit-content'>{productId ?? 'Products list'}</Heading>
			{!productId && <Search />}

			<Button
				onClick={onOpen}
				title='add new product'
				maxWidth='min-content'
				marginLeft='auto'
			>
				<AddIcon />
			</Button>

			<Modal onClose={onClose} isOpen={isOpen} title='add new product'>
				<ProductForm onClose={onClose} />
			</Modal>

			<Button
				onClick={toggleColorMode}
				maxWidth='min-content'
				title='toggle theme color'
			>
				{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
			</Button>
		</Grid>
	);
}

export default Header;
