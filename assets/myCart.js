logincheck();
getCartItemsCount(); 


	fetch(`${rootUrl}api/users/getCartItems`,{

		method: "GET",
		headers:{

			"Authorization": `Bearer ${token}`
		}
	})
	.then(result=> result.json())
	.then(result =>{


	let cartArr = result.map(e=>{

		let totalAmount = e.quantity*e._id.price;

		console.log(e._id._id);

		return`<div class="card"><div class="card-body"><h5 class ="card-title">${e._id.name}</h5><br/>
			<p>Quantity : ${e.quantity}</p>
			<p class="card-text">${e._id.description}</p>
			Price: ₱ ${e._id.price.toLocaleString('en-US')}<br/>
			Total: ₱ ${totalAmount.toLocaleString('en-US')}<br/>
			<button type="button" class="btn btn-danger btn-sm"onclick="removeFromCart('${e._id._id}')">Remove from cart</button>
			</div>
			</div>`
			

	}).join(" ")


	let total=0;
	result.forEach(i=>{


		total += i.quantity*i._id.price;


	})


	let content2 = document.querySelector('#content2');
	let checkoutBtn = document.querySelector('#checkoutBtn');

	//console.log(cartArr.totalAmount);

	document.querySelector('.cartwrapper').innerHTML = cartArr;
	document.querySelector('#cartTotal').innerHTML = `₱ ${total.toLocaleString('en-US')}`;















	//REDUCE FORMAT CHUII
/*		let total = result.reduce((a, b)=>{

			return a + b.price;
		},0)


			

		*/
/*		let content2 = document.querySelector('#content2');
		let checkoutBtn = document.querySelector('#checkoutBtn');

		if(result.length == 0 || result ==null){

			
			content2.innerHTML="<h2>No items in cart</h2>"
			return

		}

		checkoutBtn.innerHTML =`&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-warning" onclick="checkout()">Checkout</button>`
		

		let cartArr = result.map(e=>{

			return`<div class="card"><div class="card-body"><h5 class ="card-title">${e.name}</h5><br>
			<p class="card-text">${e.description}</p>
			Price: ₱ ${e.price.toLocaleString('en-US')}<br>
			<button type="button" class="btn btn-danger btn-sm"onclick="removeFromCart('${e._id}')">Remove from cart</button>
			</div>
			</div>
			`

		}).join(" ");


		document.querySelector('.cartwrapper').innerHTML = cartArr;
		document.querySelector('#cartTotal').innerHTML = total;
*/

	})

	function removeFromCart(item){

		let confirmed = confirm('Remove from Cart?');

		if (confirmed){

			fetch(`${rootUrl}api/users/removeFromCart/${item}`,{

				method: "PUT",
				headers:{

					"Authorization": `Bearer ${token}`
				}

			})
			.then(result => result.json())
			.then(result =>{

				if(result.removedFromCart === true){

					window.location.reload();

				}else{

					alert('Something went wrong');

				}

			})

		}
	}

	function checkout(){


		fetch(`${rootUrl}api/users/getCartItems`,{

			method: "GET",
			headers:{

				"Authorization": `Bearer ${token}`
			}
		})
		.then(result=>result.json())
		.then(result =>{


			fetch(`${rootUrl}api/users/checkout`,{

				method: "POST",
				headers: {

					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body:JSON.stringify({

				items: result.itemsArr

				})

			})
			.then(result=> result.json())
			.then(result =>{

				if(Object.keys(result).length === 0){

					alert('Cannot checkout. Something went wrong');

				}else{

					alert('Orders placed successfully');

					fetch(`${rootUrl}api/users/clearCart`,{

						method: "PUT",
						headers:{

							"Authorization":`Bearer ${token}`
						}
					}).then(result => result.json())
					.then(result=>{

						if(result.cartCleared === true){

							window.location.reload();
							return;

						}else{

							alert('Cannot clear cart. Something went wrong');
						}
					})

				}


			}).catch(error =>{
	
				console.log(error);
			})


		})


	}

