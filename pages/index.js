import React, { useState } from 'react';
import store from 'store-js';
import axios from 'axios';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import { EmptyState, Layout, Page } from '@shopify/polaris';

import ProductList from './components/ProductList';

const Index = () => {
	const [modal, setModal] = useState({ open: false });

	const emptyState = !store.get('ids');

	const addProduct = (product) => {
		axios
			.post('/api/products', product)
			.then((res) => console.log('res', res))
			.catch((err) => console.log('err', err));
	};

	const removeAllProducts = () => {
		axios.delete('/api/products').catch((err) => console.log('err', err));
	};

	const handleSelection = (resources) => {
		const ids = resources.selection.map((product) => product.id);
		setModal({ open: false });
		store.set('ids', ids);
		console.log('handleSelection -> store.ids', store.get('ids'));

		removeAllProducts();

		const selectedProducts = resources.selection;

		selectedProducts.map((product) => addProduct(product));
	};

	return (
		<Page>
			<TitleBar
				primaryAction={{
					content: 'Select New Products',
					onAction: () => setModal({ open: true }),
				}}
			></TitleBar>
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
