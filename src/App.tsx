import { Box, Container } from '@chakra-ui/react';
import Header from './components/Header';
import ProductsList from './components/ProductsList';

function App() {
	return (
		<>
			<Box height='100dvh'>
				<Container maxW='min'>
					<Header />
					<Box as='main' mt={6}>
						<ProductsList />
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default App;
