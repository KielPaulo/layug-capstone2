logincheck();
getCartItemsCount(); 


	cartwrapper = document.querySelector('.cartwrapper');


	fetch(`${rootUrl}api/users/getCartItems`,{

		method: "GET",
		headers:{

			"Authorization": `Bearer ${token}`
		}
	})
	.then(result=> result.json())
	.then(result =>{


		let content2 = document.querySelector('#content2');
		let checkoutBtn = document.querySelector('#checkoutBtn');



		if(result.itemsArr.length == 0 || result ==null){

			
			content2.innerHTML="<h2>No items in cart</h2>"
			return

		}

		checkoutBtn.innerHTML =`&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-warning" onclick="checkout()">Checkout</button>`

		let idArr = result.itemsArr.map(e=>{

			
			return `<span class="cartItself" id="${e}" onclick="">${e}</span><br><br>`

		}).join(" ")

		cartwrapper.innerHTML = idArr;

		let x = document.querySelectorAll('.cartItself');
		
		
		x.forEach(i=>{

			let ii = document.getElementById(`${i.id}`);


			fetch(`${rootUrl}api/products/${i.id}`,{})
				.then(result=>result.json())
				.then(result=>{

					ii.innerHTML = `

					<div class="card">
					<div class="card-body">
					<h5 class ="card-title">${result.name}</h5><br>
					<p class="card-text">${result.description}</p>
					Price: ₱ ${result.price.toLocaleString('en-US')}<br>
					<button type="button" class="btn btn-danger btn-sm"onclick="removeFromCart('${result._id}')">Remove from cart</button>
					</div>
					</div>

					`
				})

		})

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

		//alert('clicked');

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
			.then(result=> result.text())
			.then(result =>{

				alert('Orders placed succesfully');
				fetch(`${rootUrl}api/users/clearCart`,{

					method: "PUT",
					headers:{

						"Authorization":`Bearer ${token}`
					}
				}).then(result => result.json())
				.then(result=>{

					if(result.cartCleared === true){

						window.location.reload();

					}
				})

			}).catch(error =>{

				console.log('MAY ERROR');
				console.log(error);
			})


		})


	}

