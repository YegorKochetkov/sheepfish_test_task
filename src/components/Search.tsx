import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
	const [searchParams, setSearchParams] = useSearchParams();
	const filterFromParams = searchParams.get('search');

	const [query, setQuery] = useState(filterFromParams ?? '');
	const [debouncedQuery, setDebouncedQuery] = useState(filterFromParams ?? '');

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(() => query);
		}, 200);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [query]);

	useEffect(() => {
		setSearchParams((search) => {
			search.set('search', debouncedQuery);

			return search;
		});
	}, [debouncedQuery]);

	return (
		<Input
			variant='filled'
			placeholder='Search'
			name='search'
			autoFocus
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

export default Search;
