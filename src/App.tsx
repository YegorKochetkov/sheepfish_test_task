import { Box, Button, useColorMode } from "@chakra-ui/react";

function App() {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<>
			<Box height='100dvh'>
				Hello world!
				<Button onClick={toggleColorMode} mt={6}>
					{colorMode === 'light' ? 'Dark' : 'Light'} Mode
				</Button>
			</Box>
		</>
	);
}

export default App;
