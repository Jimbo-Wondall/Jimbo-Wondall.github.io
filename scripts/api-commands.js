const baseURL = 'https://weatherdatawebapi.azurewebsites.net/api';
//const baseURL = 'https://localhost:7112/api';

// TODO need to set combo box content programatically
var savedUsers = JSON.parse(window.sessionStorage.getItem("users"));

function handleForm(formEl) {
	let values = {};
	const inputs = Combine(formEl.getElementsByTagName('input'), formEl.getElementsByTagName('select'));
	for (let i = 0; i < inputs.length; i++) {
		let key = inputs[i].dataset.valueType;
		let value = inputs[i].value
		values[key] = value;
	}
	console.log(values);

	switch(formEl.dataset.page) {
		case 'GetSensor':
			
		  break;
		case 'CreateUser': 
			let user = {
				username: values.username,
				email: values.email,
				role: values.role
			}
			let endpoint = '/User/CreateUser';
			if (values.role == "Guest") endpoint = '/User/CreateGuest';
			let response = sendQuery('POST', endpoint, values.apiKey, null, user);
			console.log(response);
		break;
		default: break;
	  }
}

function Combine(collection1, collection2){
	var ary=[];
	for (var i = 0; i < collection1.length; i++){
		ary.push(collection1[i]);
	}
	for (var i = 0; i < collection2.length; i++){
		ary.push(collection2[i]);
	}
	return ary;
}

async function sendQuery(methodInput, endpoint, authorKey, queryParams, payloadObj) {
	let data = new FormData();
	let params = "";
	if(queryParams) params = '/' + new URLSearchParams(queryParams).toString();
	if(payloadObj) data.append("json", JSON.stringify(payloadObj));
	let myResponse = await fetch(
		baseURL + endpoint + params, 
		{ 
			method: methodInput, 
			headers: {'Authorization' : authorKey},
			body: JSON.stringify(data)
		}
	);
	console.log(myResponse);
	return myResponse.then(r => r.json());
}

function AddUser(user) {
	savedUsers.push(user);
	SaveUsersToStorage();
}

function SaveUsersToStorage() {
	window.sessionStorage.setItem("users", JSON.stringify(savedUsers));
}

function LoadUsersFromStorage() {
	savedUsers = JSON.parse(window.sessionStorage.getItem("users"));
}