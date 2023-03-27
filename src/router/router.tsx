import React from "react";
import { createHashRouter, redirect } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import ProductDetails from "../components/ProductDetails";
import ProductsList from "../components/ProductsList";

const router = createHashRouter([
	{
		path: '/',
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
