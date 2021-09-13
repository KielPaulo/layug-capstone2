
adminCheck();
let content1 = document.querySelector('#content1');
//let token = localStorage.getItem("token");




	fetch(`${rootUrl}api/users/list`,{

		method: "GET",
		headers:{

			"Authorization": `Bearer ${token}`
		}

	})
	.then(result => result.json())
	.then(result =>{

	
		let users = result.map(user =>{

			


			let btn="";
			let admn = "No";

			if(user.isAdmin == true){

				btn = `<button class="btn btn-danger" id="${user._id}" onclick="setAdmin('${user._id}'\,'${user.isAdmin}')">Remove as Admin</button>`;
				admn = "Yes"
			}else{

				btn = `<button class="btn btn-success" id="${user._id}" onclick="setAdmin('${user._id}'\,'${user.isAdmin}')">Set as Admin</button>`;

			}

			
			return `
			<div class="card p-4 mb-3">
			<div class="card-body>"
			<h5 class="card-title">${user.firstName} ${user.lastName}</h5>
			<br>
			Email: ${user.email}
			<br>
			Is Admin: ${admn}
			<br><br>
			${btn}
			</div>
			</div>
			
			`

		}).join(" ");

		console.log(users);




		content1.innerHTML = users;
	

	})

function setAdmin(userId, isAdmin){


	console.log(userId);
	console.log(currentUser);

	if(currentUser === userId){


		let confirmed =confirm('Are you sure you want to remove yourself as admin? You will be logged out');

		if(confirmed == false){

			return;
		}

	}

	fetch(`${rootUrl}api/users/${userId}/setAsAdmin`,{

		method: "PUT",
		headers:{
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body:JSON.stringify({

			userIsAdmin: isAdmin
		})

	})
	.then(result =>result.json())
	.then(result =>{

		if(result.newStatus === "admin"){

			alert("Successfully set as Admin");
			window.location.reload();

		}else if(result.newStatus ==="non-admin"){

			alert('Reverted to regular user');

			if(currentUser === userId){

				logout2();

			}else{

				window.location.reload();

			}
			

		}else{

			alert('Something went wrong')
		}

	})

}

