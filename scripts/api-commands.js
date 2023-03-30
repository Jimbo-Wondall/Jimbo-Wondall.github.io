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
				"username": values.Username,
				"email": values.Email,
				"role": values.Role
			}
			let endpoint = '/User/CreateUser';
			if (values.Role == 'Guest') endpoint = '/User/CreateGuest';
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
	let params = "";
	if(queryParams) params = '/' + new URLSearchParams(queryParams).toString();

	console.log(methodInput.toString());
	console.log(authorKey.toString());
	console.log(baseURL + endpoint + params);

	return await fetch(
		baseURL + endpoint + params, 
		{ 
			method: methodInput.toString(), 
			headers: {
				'Authorization' : authorKey.toString(),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payloadObj)
		}
	);
	//.then((r) => r.json()).then((d) => console.log(d));
	//return myResponse;
}

async function exampleQuery() {
	return await fetch(
		"https://localhost:7112/api/SensorData", 
		{
		method: 'POST', 
		headers: {
			'Authorization': '518997c0-88d7-4e8b-8cd8-9df7f0efa8dd', 
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"deviceName": "string",
			"precipitation": 0,
			"time": "2023-03-23T01:52:09.648Z",
			"latitude": 2.70507,
			"longitude": 90.7559,
			"temperature": 20,
			"atmosphericPressure": 120.05,
			"maxWindSpeed": 5,
			"solarRadiation": 590,
			"vaporPressure": 1.8,
			"humidity": 65,
			"windDirection": 154.47 
		})
	})
	//.then((r) => r.json()).then((d) => console.log(d));
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