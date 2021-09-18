//Global Variables----------------------------
const rootUrl = "http://localhost:3000/"; //https://warm-everglades-42196.herokuapp.com/ 
/*const rootUrl = "https://warm-everglades-42196.herokuapp.com/";*/
const token = localStorage.getItem('token');
const isAdmin = localStorage.getItem('isAdmin');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');//URL
const currentUser = localStorage.getItem("id");
const profileName = localStorage.getItem("profileName");

//Global variables-----------------------------

//Global function





const logout = document.querySelector('#logout');


let myCart = document.querySelector('#myCart');
let myOrders = document.querySelector('#myOrders');
let ifLogin = document.querySelector('#ifLogin');
let listUsers = document.querySelector('#listUsers');
let listOrders = document.querySelector('#listOrders');
let createProduct = document.querySelector('#createProduct');
let profile = document.querySelector('#profile');




if(token == undefined || token == null){

	ifLogin.innerHTML = 
	`
		
			<a href="./login.html" class="">Login</a>
		
	`

	registerLink.innerHTML =
	`
		
			<a href="./register.html" class="">Register</a>
		
	`
} else {


	if(isAdmin === "true"){

		listUsers.innerHTML=`<a href="./listUsers.html" class="activeLink" id="">| Users </a>`
		createProduct.innerHTML=`<a href="./createProduct.html" id="">| Add Product </a>`
		listOrders.innerHTML=`<a href="./listOrders.html" id="">| Orders </a>`
		profile.innerHTML = `<span class="text-info">Admin ${profileName}&nbsp;&nbsp;&nbsp;&nbsp;</span>`;

	}else{

		profile.innerHTML = `<span class="text-info">Hi, ${profileName}&nbsp;&nbsp;&nbsp;&nbsp;</span`;
		myOrders.innerHTML =`<a href="./myOrders.html"><span id=""></span>My Orders</a>`
		myCart.innerHTML =`<a href="./myCart.html"><span class="parentCart"><span id="cartItemCount"></span><img id="cartIcon" src="./images/icons8-shopping-cart-64.png"></span></a>`

	}

	ifLogin.innerHTML =

	`				
			<a href="#" id="logout" onlick="logout()">Log out</a>

	`

	//logout function here XD

		const logout = document.querySelector('#logout');

		logout.addEventListener("click", ()=>{

		localStorage.clear();

		window.location.replace('./index.html');

	})

}

function logout2(){

		localStorage.clear();

		window.location.replace('./index.html');
}

function getCartItemsCount(){

	let cartItemCount = document.querySelector('#cartItemCount');

	fetch(`${rootUrl}api/users/getCartItems`,{

		method: "GET",
		headers:{

			"Authorization": `Bearer ${token}`
		}
	})
	.then(result=>result.json())
	.then(result=>{

		console.log(result);

		let itemCount = 0;

		result.forEach(e=>{

			itemCount += e.quantity;

		})

			cartItemCount.innerHTML = itemCount;
		
	}).catch(e=>{


	})
}

	//chuii
	function addToCart(productId){

		if(token == undefined || token == null){

			alert('You must login first');
			window.location.replace('./login.html');
			return;
		}

	    fetch(`${rootUrl}api/users/addToCart/${productId}`,{
	        method: "PUT",
	        headers:{
	            "Content-Type": "application/json",
	            "Authorization": `Bearer ${token}`
	        }
	    })
	   .then(result =>result.json()) 
	   .then(result =>{

	   	if(result){

	   		alert('Added to cart');
	   		window.location.reload();//reload lang di pa marunong AJAX

	   	}

	    })
	   .catch(e => console.log(e));

	}




	function logincheck(){

		if(token == undefined || token == null){


			alert("You must login first")

			window.location.replace('./login.html')

		}

}

function adminCheck(){


			if(isAdmin !== "true"){


			alert("You are not authorized")

			window.location.replace('./index.html');
			return

		}

	


}






