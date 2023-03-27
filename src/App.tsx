import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
	return (
		<Box height='100dvh'>
			<Container maxWidth='min' minWidth='75rem'>
				<Header />
				<Box as='main' mt={6}>
					<Outlet />
				</Box>
			</Container>
		</Box>
	);
}

export default App;
