import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	useColorMode,
} from '@chakra-ui/react';

function App() {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<>
			<Box height='100dvh'>
				<Container maxW='5xl'>
					<Flex
						as='header'
						justifyContent='space-between'
						alignItems='center'
						mt={2}
					>
						<Heading>Products list</Heading>
						<Button onClick={toggleColorMode} minW='min-content'>
							{colorMode === 'light' ? 'Dark' : 'Light'} Mode
						</Button>
					</Flex>
					<Box as='main' mt={6}>
						table
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default App;
