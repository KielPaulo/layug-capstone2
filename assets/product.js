let content1 = document.querySelector('#content1');

if(id){

	fetch(`${rootUrl}api/products/${id}`,{

		method: "GET"

	})
	.then(result=> result.json())
	.then(result =>{

		let atcBtn="";

		if(isAdmin !=="true"){

			atcBtn = `<button class="addToCartbtn btn btn-sm btn-outline-success" onclick="addToCart('${result._id}')" id="${result._id}">Add to cart</button>`

		}
	
		if(result){

			content1.innerHTML = `

			<div class = "card p-3" style="width: 30rem;">
			<img class="card-img-top" src="./images/Ha044662ca63642c18a1ec99723233463g.webp" alt="Card image cap">
			<h5 class="card-title">${result.name}</h5><br>
			<h6 class="card-subtitle mb-2 text-muted">${result.description}</h6>
			₱${result.price.toLocaleString('en-US')}
			${atcBtn}
			
			</div>

			`
		}else{

			alert('No product to show');
		}


	})

}

getCartItemsCount();
//addToCart();

