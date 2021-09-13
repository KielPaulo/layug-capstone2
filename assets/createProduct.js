let createProductForm = document.querySelector('#createProductForm');

adminCheck();
//let token = localStorage.getItem("token");


createProductForm.addEventListener('submit',(e)=>{

	e.preventDefault();

let name =document.querySelector('#name').value;
let description =document.querySelector('#description').value;
let price =document.querySelector('#price').value;


	fetch(`${rootUrl}api/products/create`,{

			method: "POST",
			headers:{

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body:JSON.stringify({

				name: name,
				description: description,
				price: price
			})

		})
		.then(result=> result.json())
		.then(result =>{

			if(result.isCreated === true){

				alert('Product successfully added');
				window.location.replace('./index.html')


			}else{

				alert('Something went wrong');
	
			}

		})


})


