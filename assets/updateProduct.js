adminCheck();
let updateProductForm = document.querySelector('#updateProductForm');


let name =document.querySelector('#name');
let description =document.querySelector('#description');
let price =document.querySelector('#price');
let archiveBtnSpan =document.querySelector('#archiveBtnSpan');
let deleteBtn =document.querySelector('#deleteBtn');
/*let archiveBtn =document.querySelector('#archiveBtn');*/


fetch(`${rootUrl}api/products/${id}`,{})

.then(result=>result.json())
.then(result =>{

	name.value = result.name;
	description.value = result.description;
	price.value = result.price;

	let archiveBtnText="";
	let archiveBtncolor="";

	if(result.isActive){

		 archiveBtnText = "Archive";
		 archiveBtncolor ="btn-warning";

	}else{

		 archiveBtnText = "Unarchive";
		 archiveBtncolor ="btn-info";
	}


	archiveBtnSpan.innerHTML =`<button type="button" id="archiveBtn" class="btn ${archiveBtncolor}">${archiveBtnText}</button>`

	//I cannot get archiveBtn to add  event listener so I will use the span container
	archiveBtnSpan.addEventListener('click', ()=>{

		//ARCHIVE UNARCHIVE FETCH START---------------------------------
		fetch(`${rootUrl}api/products/${result._id}/archive/`,{

			method: "PUT",
			headers: {

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`

			},
			body:JSON.stringify({

				isActive: result.isActive
			})
		})
		.then(result =>result.json())
		.then(result =>{

			if(result.archived === true){

				alert('Archived successfully');
				window.location.reload();

			}else{


				alert('Unarchived successfully');
				window.location.reload();

			}

		})

		//ARCHIVE UNARCHIVE FETCH ------------------------------END
	})

	//DELETE FETCH START---------------------------------

	deleteBtn.addEventListener('click', ()=>{


		let confirmAlert= confirm("Are you sure you want to delete this product? Click ok to delete.");

		if(confirmAlert){

			fetch(`${rootUrl}api/products/${result._id}/delete`,{

				method: "DELETE",
				headers:{

					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result =>{

				if(result.deleted === true){

					alert('Product deletion successful');
					window.location.replace('./index.html')
				}else{

					alert('Something went wrong')
				}

			})
		}
	})
	//DELETE FETCH END---------------------------------

})


updateProductForm.addEventListener('submit', (e)=>{

	e.preventDefault();

fetch(`${rootUrl}api/products/${id}`,{

	method: "PUT",
	headers:{

		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	},
	body:JSON.stringify({

		name: name.value,
		description: description.value,
		price: price.value

	})
})
.then(result=> result.json())
.then(result=>{

	if(result.updateSuccess === true){

		alert('Product successfully updated');
		window.location.reload();

	}else{

		alert('Something went wrong');
	}


})


})

