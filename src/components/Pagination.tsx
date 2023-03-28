import {
	Button,
	Flex,
	HStack,
	Select,
	Text
	} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

type PaginationPropsType = {
	totalPages: number;
	perPage: number;
	page: number;
	getLink: (page: number) => string;
	onPerPageChange: (perPage: string) => void;
};

export const Pagination = (props: PaginationPropsType) => {
	const { totalPages, page, perPage, getLink, onPerPageChange } = props;

	const numberOfButtons = Math.ceil(totalPages / perPage);
	const buttons = useMemo(() => {
		return Array.from({ length: numberOfButtons }, (_, index) => index + 1);
	}, [totalPages, perPage]);

	let currPage = page;
	const currPerPage = perPage;

	if (currPage > numberOfButtons) {
		currPage = numberOfButtons;
	}

	if (currPage < 1) {
		currPage = 1;
	}

	const prevButton = currPage - 1 < 0 ? 1 : currPage - 1;
	const nextButton =
		currPage + 1 > numberOfButtons ? numberOfButtons : currPage + 1;

	const lastButton = numberOfButtons;
	const firstButton = 1;

	const isLastButton = currPage === numberOfButtons;
	const isFirstButton = currPage === 1;

	const spread = 2;

	const isButtonShow = (button: number) => {
		const first5Buttons = button <= 5 && currPage <= 3;
		const last5Buttons =
			button >= numberOfButtons - 4 && currPage >= numberOfButtons - 2;

		return (
			button === currPage ||
			button === prevButton ||
			button === nextButton ||
			button === firstButton ||
			button === lastButton ||
			button === nextButton + 1 ||
			button === prevButton - 1 ||
			first5Buttons ||
			last5Buttons
		);
	};

	const visibleButtons = useMemo(() => {
		const filtered: (number | boolean)[] = buttons.filter(isButtonShow);

		const firstButton = 1;
		const lastButton = numberOfButtons;
		const firstVisibleButton = filtered[0] as number;
		const secondVisibleButton = filtered[1] as number;
		const lastVisibleButton = filtered.at(-1) as number;
		const beforeLastVisibleButton = filtered.at(-2) as number;

		let isFirstDots = secondVisibleButton - firstVisibleButton > 1;
		let isLastDots = lastVisibleButton - beforeLastVisibleButton > 1;

		if (firstButton === lastButton) return [firstButton];

		const visible = [
			firstButton,
			isFirstDots,
			...filtered.slice(1, -1),
			isLastDots,
			lastButton,
		];

		return visible;
	}, [isButtonShow]);

	return (
		<Flex justifyContent='space-between' marginTop={8}>
			<Flex as='nav'>
				<Button
					as={Link}
					to={getLink(prevButton)}
					isDisabled={isFirstButton}
					marginRight={6}
				>
					Prev
				</Button>

				<HStack>
					{visibleButtons.map((button, index) => {
						if (button === true) {
							return (
								<Button key={String(button) + String(index)} isDisabled>
									&#8230;
								</Button>
							);
						}

						if (button === currPage) {
							return (
								<Button isActive disabled key={String(button) + String(index)}>
									{button}
								</Button>
							);
						}

						if (button !== false) {
							return (
								<Button
									as={Link}
									variant='outline'
									to={getLink(button)}
									disabled={button === currPage}
									key={String(button) + String(index)}
								>
									{button}
								</Button>
							);
						}
					})}
				</HStack>

				<Button
					as={Link}
					isDisabled={isLastButton}
					to={getLink(nextButton)}
					marginLeft={6}
				>
					Next
				</Button>
			</Flex>

			<HStack>
				<Text>Items on a page:</Text>
				<Select
					value={currPerPage}
					onChange={({ target }) => onPerPageChange(target.value)}
				>
					<option value='1'>1</option>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='20'>20</option>
				</Select>
			</HStack>
		</Flex>
	);
};
