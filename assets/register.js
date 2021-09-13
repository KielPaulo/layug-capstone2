let registerForm = document.querySelector('#registerUser');


registerForm.addEventListener("submit", (e)=>{

	e.preventDefault();

//target the elements of the form and get their values
let firstName =document.getElementById('firstName').value;
let lastName =document.getElementById('lastName').value;
let mobileNo =document.getElementById('mobileNo').value;
let email =document.getElementById('email').value;
let password =document.getElementById('password').value;
let password2 =document.getElementById('password2').value;

	if(password === password2 && password !=="" && password2 !==""){

		fetch(`${rootUrl}api/users/register`,{

			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				
					firstName: firstName,
					lastName: lastName,
					mobileNo: mobileNo,
					email: email,
					password: password
			})

		})
		.then(result=>result.json())
		.then(result =>{

			if(result.emailTaken){

				alert('Email already registered');
			}

			if(result.registration === true){

				alert('Succesfully registered. Redirecting you to login.');
				window.location.replace('./login.html')
			}



			
		

		})


	}

});

