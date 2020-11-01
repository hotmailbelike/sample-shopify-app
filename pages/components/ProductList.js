import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import store from 'store-js';
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from '@shopify/polaris';

const GET_PRODUCTS_BY_ID = gql`
	query getProducts($ids: [ID!]!) {
		nodes(ids: $ids) {
			... on Product {
				title
				handle
				id
				images(first: 1) {
					edges {
						node {
							originalSrc
							altText
						}
					}
				}
				variants(first: 1) {
					edges {
						node {
							price
							id
						}
					}
				}
			}
		}
	}
`;

const ProductList = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
		variables: { ids: store.get('ids') },
	});

	if (loading) {
		return <div>Loading Products...</div>;
	} else if (error) {
		return <div>{error.message}</div>;
	}
	console.log('ProductList -> data', data);

	return (
		<div>
			<h1>Selected Products</h1>
			{data.nodes.map((item) => (
				<p key={item.id}>{item.title}</p>
			))}
		</div>
	);
};

export default ProductList;
