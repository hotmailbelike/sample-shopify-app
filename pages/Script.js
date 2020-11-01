import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Layout, Page, ResourceList, Stack } from '@shopify/polaris';

const CREATE_SCRIPT_TAG = gql`
	mutation scriptTagCreate($input: ScriptTagInput!) {
		scriptTagCreate(input: $input) {
			scriptTag {
				id
			}
			userErrors {
				field
				message
			}
		}
	}
`;

const QUERY_SCRIPT_TAGS = gql`
	{
		scriptTags(first: 10) {
			edges {
				node {
					id
					src
					displayScope
				}
			}
		}
	}
`;

const DELETE_SCRIPT_TAG = gql`
	mutation scriptTagDelete($id: ID!) {
		scriptTagDelete(id: $id) {
			deletedScriptTagId
			userErrors {
				field
				message
			}
		}
	}
`;

const Script = () => {
	const [createScript] = useMutation(CREATE_SCRIPT_TAG);
	const [deleteScript] = useMutation(DELETE_SCRIPT_TAG);
	const { loading, error, data } = useQuery(QUERY_SCRIPT_TAGS);

	if (loading) {
		return <div>Loading Products...</div>;
	} else if (error) {
		return <div>{error.message}</div>;
	}
	console.log('Script -> data', data);

	return (
		<Page>
			<Layout>
				<Layout.Section>
					<Card sectioned title='These are the Script Tags'>
						<p>Create or Delete a Script Tag</p>
					</Card>
				</Layout.Section>
				<Layout.Section secondary>
					<Card sectioned title='Delete Tag'>
						<Button
							primary
							size='slim'
							submit
							onClick={() =>
								createScript({
									variables: {
										input: {
											src: 'https://a69f78d62ab8.ngrok.io/test-script.js',
											displayScope: 'ALL',
										},
									},
									refetchQueries: [
										{
											query: QUERY_SCRIPT_TAGS,
										},
									],
								})
							}
						>
							Create Script Tag
						</Button>
					</Card>
				</Layout.Section>
				<Layout.Section>
					<Card>
						<ResourceList
							showHeader
							resourceName={{ singular: 'Script', plural: 'Scripts' }}
							items={data.scriptTags.edges}
							renderItem={(item, id, index) => (
								<ResourceList.Item id={item.id}>
									<Stack>
										<Stack.Item>
											<p>{item.node.id}</p>
										</Stack.Item>
										<Stack.Item>
											<Button
												submit
												onClick={() =>
													deleteScript({
														variables: {
															id: item.node.id,
														},
														refetchQueries: [
															{
																query: QUERY_SCRIPT_TAGS,
															},
														],
													})
												}
											>
												Delete Script Tag
											</Button>
										</Stack.Item>
									</Stack>
								</ResourceList.Item>
							)}
						></ResourceList>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	);
};

export default Script;
