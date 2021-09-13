logincheck();
let content2 = document.querySelector('#content2');
getCartItemsCount();

fetch(`${rootUrl}api/users/myOrders`,{

	method: "GET",
	headers:{

		
		"Authorization":`Bearer ${token}`
	}


})
.then(result=> result.json())
.then(result =>{

	console.log(result);


	let renderedProducts = result.map(ii =>{
		


			let item = ii.items.map(iix=>{

				return `<li><a href="./product.html?id=${iix._id}">${iix.name}</a></li>`


			}).join(" ")


		return`<div class="card p-3 mb-4"><div class="card-body">Order ID : ${ii._id}<br>
		Total Amount: ₱ ${ii.totalAmount.toLocaleString('en-Us')}<br><br>

		Created on: ${ii.createdOn}<br>

		Items: 
		<ul>
		${item}
		</ul>
		</div>
		</div>

		`

		/*Items: <a href="">${}</a>*/


	}).join(" ")

	//console.log(orders);

	content2.innerHTML = renderedProducts;


})



	/*let orderArr = result.map(order=>{

		let pId= order.items.map(e=>{

			return `<li>${e}</li>`

		}).join(" ")

		return `

		<div class = "card mt-4 p-3 mb-4">
		ORDER ID: ${order._id} 
		<br>
	
		Total amount: ₱ ${order.totalAmount.toLocaleString('en-US')}
		<br>
		Created on: ${order.createdOn.toLocaleString('en-US')}
		<br><br>
		Items: <ul>${pId}</ul>
		<br><br>
		</div>
		
		`


	}).join(" ")


content2.innerHTML = orderArr;*/

/*}).catch(error=>{


	console.log(error);
})
*/