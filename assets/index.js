
let fetchUrl="";

let addToCartSpan = document.querySelector('#addToCartSpan');
let content1 = document.querySelector('#content1');


let items = document.querySelector('#items');
let count = 0;


if(isAdmin === "true"){

	console.log("ADMINPAGE");

	fetchUrl =`${rootUrl}api/products/adminProductList/`;

}else{

	fetchUrl =`${rootUrl}api/products/`;

}


fetch(`${fetchUrl}`,{
						
		method: "GET",
		headers:{

			"Authorization": `Bearer ${token}`
		}

	})
	.then(result => result.json())
	.then(result =>{

		let editDeleteArchive ="";
		let addToCartBtn = ""


		
		let productList = result.map(product =>{

			if (isAdmin !=="true") {

				editDeleteArchive ="";
				addToCartBtn = `<button class="btn btn-sm btn-outline-success addToCartbtn" onclick="addToCart('${product._id}')" id="${product._id}">Add to cart</button>`

			}else{

				editDeleteArchive =

			`<span><a href ="./updateProduct.html?id=${product._id}">Edit</span></a>
			<br><br>
			`

				
			}

			return `
			<div class="d-inline-flex mb-2">
			<div class = "card p-3" style="width: 15rem;">
			<img class="card-img-top" src="./images/partner01.jpg" alt="Card image cap">
			<h5 class="card-title"><a href="./product.html?id=${product._id}">${product.name}</a></h5><br>
			<h6 class="card-subtitle mb-2 text-muted">${product.description}</h6>
			₱${product.price.toLocaleString('en-US')}
			
			${addToCartBtn}
			${editDeleteArchive}
			</div>
			
			
			</div>
			
			

			`;

		}).join(" ")


	content1.innerHTML = productList;


});




getCartItemsCount();
