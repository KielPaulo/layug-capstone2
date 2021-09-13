adminCheck();
let content1 = document.querySelector('#content1');

fetch(`${rootUrl}api/users/orders`,{

	method: "GET",
	headers:{

		"Authorization": `Bearer ${token}`
	}

})
.then(result => result.json())
.then(result =>{

	

	if(result.length == 0){

		content1.innerHTML = "No orders to show";

	}else{

		
		let renderedProducts = result.map(ii =>{
			

				let user = ii.userArr.map(iii=>{

					return `${iii.firstName} ${iii.lastName}`

				}).join(" ")

				let items = ii.productArr.map(iix=>{

					return `<li><a href="./product.html?id=${iix._id}">${iix.name}</a></li>`


				}).join(" ")


			return`<div class="card p-3 mb-4"><div class="card-body">Order ID : ${ii._id}<br>
			Total Amount: ${ii.totalAmount}<br><br>

			Created on: ${ii.createdOn}<br>

			Buyer: ${user}<br>
			Buyer ID: ${ii.buyerId}<br>
			Items: 
			<ul>
			${items}
			</ul>
			</div>
			</div>

			`

			/*Items: <a href="">${}</a>*/


		}).join(" ")

		//console.log(orders);

		content1.innerHTML = renderedProducts;




/*		let orders = result.map(order =>{

		
			let pId= order.items.map(e=>{

				fetch(`${rootUrl}api/products/${e}`,{})
				.then(result=>result.json())
				.then(result => {

					//console.log(result)

				})

				return `<li>${e}</li>`

			}).join(" ")

			return `

			
		<div class = "card mt-4 p-3 mb-4">
		ORDER ID: ${order._id} 
		<br>

		Buyer ID: ${order.buyerId} 
		<br>
	
		Total amount: ₱ ${order.totalAmount.toLocaleString('en-US')}
		<br>
		Created on: ${order.createdOn.toLocaleString('en-US')}
		<br><br>
		Items: <ul>${pId}</ul>
		<br><br>
		</div>
			`

		}).join(" ");

		

		content1.innerHTML = orders;
*/


	}
	 
	

})












































/*


fetch(`${rootUrl}api/users/orders`,{

	method: "GET",
	headers:{
		
		"Authorization": `Bearer ${token}`
	}

})
.then(result => result.json())
.then(result =>{

	let content1 = document.querySelector('#content1');

try{

	let orders = result.map(e=>{

		console.log(e)

		return 
			`
			${e._id}<br>
			${e.totalAmount}<br>
			`

	}).join(" ");

	

}catch(err){

	console.log(error);
}

content1.addEventListener('click',()=>{

	alert('POTA KA')
})




	//console.log(orders);



	//content1.innerHTML = orders;


	
	//console.log(result);




})


*/