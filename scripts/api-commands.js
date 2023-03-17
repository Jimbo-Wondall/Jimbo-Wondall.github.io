//const baseURL = 'https://weatherdatawebapi.azurewebsites.net/api';
const baseURL = 'https://localhost:7112/api';
var savedUsers = new Array();

function AddUser(user) {
	savedUsers.push(user);
	SaveUsersToStorage();
}

function LoadUsersFromStorage() {
	savedUsers = JSON.parse(window.sessionStorage.getItem("users"));
	
}
function SaveUsersToStorage() {
	window.sessionStorage.setItem("users", JSON.stringify(savedUsers));
}

async function GetAll(apiKey){
	apiKey = '0c7a80a6-c90f-4757-8e3d-4e81d8a0e8a6';
	let myResponse = JSON.parse(await fetch(baseURL + '/SensorData', { method: 'GET', headers: {'Authorization': apiKey }}).then(r => r.json()));
	console.log(myResponse);
}

async function GetUserInfo(apiKey, requestedKey) {
	// for "logging in" as a user, query api to see if user exists
	// should not need apikey
	let myResponse = JSON.parse(await fetch(baseURL + '/Users', { method: 'GET', headers: {'Authorization': apiKey, 'Requested GUID': requestedKey }}).then(r => r.json()));
	console.log(myResponse);
	// if user exists store info returned in session storage
	//var responseHeaders = myResponse.headers
	//var user = {
	//	username: responseHeaders.Username,
	//	guid: responseHeaders.ApiKey
	//};
	//AddUser(user);
	
}

async function CreateNewUser() {
	var apiKey = '518997c0-88d7-4e8b-8cd8-9df7f0efa8dd';
	var userInfo = {
		username: "test account",
		email: "example@email.com",
		role: "Guest",
		lastLogin: "2023-03-10T13:29:52.883Z",
		apiKey: "0c7a80a6-c90f-4757-8e3d-4e81d8a0e8a6"
	};
	let user = JSON.stringify(userInfo);
	let myResponse = await fetch(baseURL + '/Users/CreateUser', { 
		method: 'POST', 
		headers: 
		{
			'Authorization': apiKey 
		}, 
		body: user
	}).then(r => r.json());
	console.log(myResponse);
	// if response was successfull, store user info and returned guid in session storage
	//var responseHeaders = myResponse.headers
	//var user = {
	//	username: responseHeaders.Username,
	//	guid: responseHeaders.ApiKey
	//};
	//AddUser(user);
}