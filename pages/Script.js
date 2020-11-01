import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

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

const Script = () => {
	return (
		<div>
			<h1>Hello this is the Script Page</h1>
		</div>
	);
};

export default Script;
