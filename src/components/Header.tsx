import {
	Button,
	Flex,
	Heading,
	useColorMode
	} from "@chakra-ui/react";
import React from "react";

function Header() {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<Flex as='header' justifyContent='space-between' alignItems='center' mt={2}>
			<Heading>Products list</Heading>
			<Button onClick={toggleColorMode} minW='min-content'>
				{colorMode === 'light' ? 'Dark' : 'Light'} Mode
			</Button>
		</Flex>
	);
}

export default Header;
