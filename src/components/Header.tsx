import {
	Button,
	Grid,
	Heading,
	useColorMode
	} from "@chakra-ui/react";
import React from "react";
import Search from "./Search";

function Header() {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<Grid templateColumns='1fr 1fr min-content' gap={6} marginTop={6}>
			<Heading minWidth='fit-content'>Products list</Heading>
			<Search />
			<Button onClick={toggleColorMode} minWidth='min-content'>
				{colorMode === 'light' ? 'Dark' : 'Light'} Mode
			</Button>
		</Grid>
	);
}

export default Header;
