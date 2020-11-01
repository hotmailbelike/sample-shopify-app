import React, { useState } from 'react';
import store from 'store-js';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { EmptyState, Layout, Page } from '@shopify/polaris';

import ProductList from './components/ProductList';

const Index = () => {
	const [modal, setModal] = useState({ open: false });

	const emptyState = !store.get('ids');

	const handleSelection = (resources) => {
		const ids = resources.selection.map((product) => product.id);
		setModal({ open: false });
		store.set('ids', ids);
		console.log('handleSelection -> store.ids', store.get('ids'));
	};

	return (
		<Page>
			<ResourcePicker
				resourceType='Product'
				showVariants={false}
				open={modal.open}
				onCancel={() => setModal({ open: false })}
				onSelection={(resources) => handleSelection(resources)}
			></ResourcePicker>

			{emptyState ? (
				<Layout>
					<EmptyState
						heading='Manage your inventory transfers'
						action={{
							content: 'Select Products',
							onAction: () => setModal({ open: true }),
						}}
						image='https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'
					>
						<p>Select Products</p>
					</EmptyState>
				</Layout>
			) : (
				<ProductList></ProductList>
			)}
		</Page>
	);
};

export default Index;
