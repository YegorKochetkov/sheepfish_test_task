import { chunk } from "lodash";
import {
	useCallback,
	useEffect,
	useMemo,
	useState
	} from "react";
import { useSearchParams } from "react-router-dom";
import useDataSort from "./useDataSort";

function usePagination() {
	const { sortedData: sortedItems } = useDataSort();
	const [searchParams, setSearchParams] = useSearchParams();

	const perPageItems = parseInt(searchParams.get('perPage') ?? '10', 10);
	const pagesCount = Math.ceil((sortedItems?.length || 0) / perPageItems);
	let pageFromParams = parseInt(searchParams.get('page') ?? '1', 10);

	const currPage = useMemo(() => {
		if (pageFromParams > pagesCount) {
			pageFromParams = pagesCount;

			setSearchParams((search) => {
				search.set('page', String(pagesCount));

				return search;
			});
		}

		if (pageFromParams < 1) {
			pageFromParams = 1;

			setSearchParams((search) => {
				search.set('page', String(1));

				return search;
			});
		}

		return pageFromParams;
	}, [searchParams]);

	const paginatedItems = useMemo(
		() => chunk(sortedItems, perPageItems),
		[sortedItems]
	);

	const visibleItems = useMemo(() => {
		return paginatedItems[currPage - 1];
	}, [paginatedItems, currPage]);

	const getLink = (newPage: number) => {
		searchParams.set('page', String(newPage));

		return '?' + searchParams.toString();
	};

	const onPerPageChange = (perPage: string) => {
		setSearchParams((search) => {
			search.set('perPage', perPage);

			return search;
		});
	};

	return {
		currPage,
		perPageItems,
		visibleItems,
		sortedItems,
		getLink,
		onPerPageChange,
	};
}

export default usePagination;
