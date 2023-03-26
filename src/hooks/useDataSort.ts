import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAllProducts } from '../store/productsSlice';
import { useGetPostsQuery } from '../store/services/products';
import { ProductType } from '../types/product';

function useDataSort() {
	const [currSortBy, setCurrSortBy] = useState<keyof ProductType>('id');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const { data } = useGetPostsQuery();

	const dispatch = useAppDispatch();
	const products = useAppSelector((state) => state.products.allProducts);

	useEffect(() => {
		if (data && !products.length) {
			dispatch(setAllProducts(data.products));
		}
	}, [data]);

	const sortedData = useMemo(() => {
		const sortedData = products.slice().sort((a, b) => {
			const prev = a[currSortBy];
			const next = b[currSortBy];

			if (typeof prev === 'string' && typeof next === 'string') {
				return sortOrder === 'asc'
					? prev.localeCompare(next)
					: next.localeCompare(prev);
			} else if (typeof prev === 'number' && typeof next === 'number') {
				return sortOrder === 'asc' ? prev - next : next - prev;
			}

			return 0;
		});

		return sortedData;
	}, [sortOrder, currSortBy, products]);

	function handleSort(sortBy: keyof ProductType) {
		if (sortBy === currSortBy) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setCurrSortBy(sortBy);
			setSortOrder('asc');
		}
	}

	return { sortedData, sortOrder, handleSort, currSortBy };
}

export default useDataSort;
