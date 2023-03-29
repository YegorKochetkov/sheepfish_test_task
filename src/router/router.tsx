import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../components/ErrorPage';
import ProductDetails from '../components/ProductDetails';
import ProductsList from '../components/ProductsList';

const router = createBrowserRouter([
	{
		path: '',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <ProductsList />,
			},
			{
				path: 'product/:productId',
				element: <ProductDetails />,
			},
		],
	},
]);
export default router;
