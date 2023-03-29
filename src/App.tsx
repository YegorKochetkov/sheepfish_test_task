import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
	return (
		<Container maxWidth='min' minWidth='75rem'>
			<Header />
			<Box as='main' mt={6}>
				<Outlet />
			</Box>
		</Container>
	);
}

export default App;
