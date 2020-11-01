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
		<Card>
			<ResourceList
				showHeader
				resourceName={{ singular: 'Product', plural: 'Products' }}
				items={data.nodes}
				renderItem={(item, id, index) => {
					const media = (
						<Thumbnail
							source={item.images.edges[0] ? item.images.edges[0].node.originalSrc : ''}
							alt={item.images.edges[0] ? item.images.edges[0].altText : ''}
						></Thumbnail>
					);
					const price = item.variants.edges[0].node.price;
					return (
						<ResourceList.Item
							id={item.id}
							media={media}
							accessibilityLabel={`View details for ${item.title}`}
						>
							<Stack>
								<Stack.Item fill>
									<h3>
										<TextStyle variation='strong'>{item.title}</TextStyle>
									</h3>
								</Stack.Item>
								<Stack.Item>
									<p>${price}</p>
								</Stack.Item>
							</Stack>{' '}
						</ResourceList.Item>
					);
				}}
			></ResourceList>
		</Card>
	);
};

export default ProductList;
