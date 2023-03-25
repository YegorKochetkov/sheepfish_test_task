import { useEffect, useMemo, useState } from "react";
import { ProductType } from "../types/product";

function useDataSort(
	data: ProductType[] = [],
	initialSortBy: keyof ProductType
) {
	const [currSortBy, setCurrSortBy] = useState(initialSortBy);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const sortedData = useMemo(() => {
		const sortedData = data.slice().sort((a, b) => {
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
	}, [sortOrder, data, currSortBy]);

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
