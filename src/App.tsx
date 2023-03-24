import { useGetPostsQuery } from "./store/services/products";
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
						<>
							{errorMessage?.toUpperCase()}
							{isLoading && 'Loading...'}
							{data?.products.map((product) => product.title)}
						</>
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default App;
