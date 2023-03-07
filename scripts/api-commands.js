async function GetAll(){
    await fetch('https://weatherdatawebapi.azurewebsites.net/api/SensorData/', {
		method: 'GET',
		headers: {
			'Authorization': '0c7a80a6-c90f-4757-8e3d-4e81d8a0e8a6'
		},
	})
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
}