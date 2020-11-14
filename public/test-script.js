// console.log('this is from script tag api!!!!');
// console.log('this is from script tag api again!!!!');

// const header = document.querySelector('header.site-header').parentNode;

// const makeHeader = (data) => {
// 	let div = document.createElement('div');
// 	div.append(data);

// 	div.style.textAlign = 'center';
// 	div.style.backgroundColor = 'orange';

// 	header.prepend(div);

// 	// console.log('header', header);
// };

const body = document.querySelector('body');
body.style.position = 'relative';

const shop = Shopify.shop;

const makeApp = (products) => {
	let div = document.createElement('div');

	let h3 = document.createElement('h3');
	h3.innerHTML = 'Out Best Sellers';

	div.style.position = 'fixed';
	div.style.backgroundColor = 'white';
	div.style.border = '1px solid black';
	div.style.bottom = '80px';
	div.style.right = '25px';
	div.style.height = '400px';
	div.style.width = '350px';
	div.style.display = 'none';
	div.style.padding = '10px';
	div.style.overflowY = 'scroll';

	div.append(h3);

	const bestSellerContainer = div;

	var template = [];
	products.map((item) => {
		template.push(`
      <a href="products/${item.handle}" style="display: flex; align-items: center; padding: 20px 10px; border-top: 1px solid black;">
        <img src=${item.images[0].originalSrc} style="width: 75px;">
        <div style="display: flex; justify-content: space-around; align-items: flex-start; width: 100%;">
          <p style="padding: 0 10px;">${item.title}</p>
          <p>${item.variants[0].price}</p>
        </div>
      </a>
    `);
	});

	var htmlString = template.join('');
	bestSellerContainer.innerHTML = htmlString;

	const img = document.createElement('img');
	img.src =
		'https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png';
	img.style.position = 'fixed';
	img.style.width = '150px';
	img.style.bottom = '20px';
	img.style.right = '20px';
	img.style.cursor = 'pointer';

	const bestSellerButton = img;

	body.append(bestSellerButton);
	body.append(bestSellerContainer);

	bestSellerButton.addEventListener('click', () => {
		let display = bestSellerContainer.style.display;
		if (display === 'none') {
			bestSellerContainer.style.display = 'block';
		} else {
			bestSellerContainer.style.display = 'none';
		}
	});
};

fetch(
	'https://cors-anywhere.herokuapp.com/https://3bef80529396.ngrok.io/api/products?shop=omar-sample-app-store.myshopify.com'
)
	.then((res) => res.json())
	.then((res) => {
		// console.log('res', res);
		// makeHeader(res.data);
		makeApp(res.data);
	})
	.catch((err) => {
		console.log('err', err);
	});
