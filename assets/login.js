let loginUser = document.querySelector('#loginUser');

loginUser.addEventListener("submit", (e)=>{

	e.preventDefault();

let email = document.querySelector('#email').value;
let password = document.querySelector('#password').value;

	fetch(`${rootUrl}api/users/login`,{

		method: "POST",
		headers: {

			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			email: email,
			password: password
		})
	})

	.then(result => result.json())
	.then(result => {

		if(result.emailRegistered === false || result.password === false){

			alert('Email address or password is incorrect');

		}else{

			

			//very wrong here but works so leave it be for now
			localStorage.setItem("token", result[0].access);
			localStorage.setItem("id", result[1].userId);
			localStorage.setItem("isAdmin", result[2].isAdmin);
			localStorage.setItem("profileName", result[3].firstName);
			window.location.replace('./index.html');

		}

		
})

})