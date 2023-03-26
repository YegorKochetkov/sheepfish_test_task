import { HTMLChakraProps, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { ProductType } from '../types/product';

type ProductItemTextFieldProps = Pick<ProductType, 'category'> &
	HTMLChakraProps<'p'>;

function ProductItemTextField({
	category,
	...otherProps
}: ProductItemTextFieldProps) {
	return (
		<Tooltip label={category} openDelay={200}>
			<Text
				{...otherProps}
				overflow='hidden'
				textOverflow='ellipsis'
				whiteSpace='nowrap'
				lineHeight='1.5rem'
				title={category}
			>
				{category}
			</Text>
		</Tooltip>
	);
}

export default ProductItemTextField;
