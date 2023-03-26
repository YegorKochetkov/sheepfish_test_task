import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import { persistor, store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</PersistGate>
		</ReduxProvider>
	</React.StrictMode>
);
