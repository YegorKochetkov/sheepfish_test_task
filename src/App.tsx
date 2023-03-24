import { Box, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import { useGetPostsQuery } from "./store/services/products";

function App() {
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
					<Header />
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
