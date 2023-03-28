import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAllProducts } from "../store/productsSlice";
import { useGetPostsQuery } from "../store/services/products";
import { ProductType } from "../types/product";

function useDataSort() {
	const [searchParams] = useSearchParams();
	const sortByFromParams = searchParams.get('sortby') as
		| keyof ProductType
		| null;
	const orderByFromParams = searchParams.get('orderby') as
		| 'asc'
		| 'desc'
		| null;

	const [currSortBy, setCurrSortBy] = useState<keyof ProductType>(
		sortByFromParams ?? 'id'
	);

	const [orderBy, setOrderBy] = useState<'asc' | 'desc'>(
		orderByFromParams ?? 'asc'
	);

	const { data } = useGetPostsQuery();

	const dispatch = useAppDispatch();
	const products = useAppSelector((state) => state.products.allProducts);

	useEffect(() => {
		if (data && !products.length) {
			dispatch(setAllProducts(data.products));
		}
	}, [data]);

	useEffect(() => {
		sortByFromParams && setCurrSortBy(sortByFromParams);
		orderByFromParams && setOrderBy(orderByFromParams);
	}, [searchParams]);

	const sortedData = useMemo(() => {
		const sortedData = products
			.filter((product) => product.isDeleted !== true)
			.sort((a, b) => {
				const prev = a[currSortBy];
				const next = b[currSortBy];

				if (typeof prev === 'string' && typeof next === 'string') {
					return orderBy === 'asc'
						? prev.localeCompare(next)
						: next.localeCompare(prev);
				} else if (typeof prev === 'number' && typeof next === 'number') {
					return orderBy === 'asc' ? prev - next : next - prev;
				}

				return 0;
			});

		return sortedData;
	}, [orderBy, currSortBy, products, searchParams]);

	return { sortedData, orderBy, currSortBy };
}

export default useDataSort;
