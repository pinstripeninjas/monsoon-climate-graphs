const ctx = document.getElementById("myChart").getContext("2d");

//const sites = [];
const actualPrecip = [];
const normalPrecip = [];

const buildSites = (data) => {
	let sites = [];
	console.log(data);
	for (site of data.data) {
		console.log(site.name);
		//sites.push(site.name);
	}
	//console.log(sites);
	return sites;
};

const buildActualPrecip = (data) => {
	for (site of data) {
		let totalPrecipAmount = 0;
		for (precip of site.actualPrecip) {
			//console.log(precip)
			if (precip !== "T" && precip !== "M") {
				totalPrecipAmount += precip;
			}
		}
		actualPrecip.push(Number(totalPrecipAmount.toFixed(2)));
		//console.log(Number(totalPrecipAmount.toFixed(2)));
	}
};

async function getPrecipData() {
	const precipData = await axios.get("https://api.myjson.com/bins/qgwqy");
	const sites = await buildSites(precipData);
}

getPrecipData();

// axios.get("https://api.myjson.com/bins/qgwqy")
//   .then(function (response) {
//     // handle success
//     //buildSites(response.data.data);
//     buildActualPrecip(response.data.data);
//   const chart = new Chart(ctx, {
//     type: 'bar',

//     data: {
//         labels: sites,
//         datasets: [{
//             label: 'Actual Precip',
//             backgroundColor: '#057ff3',
//             borderColor: '#057ff3',
//             data: [actualPrecip]
//         },{
//             label: 'Normal Precip',
//             backgroundColor: '#777',
//             borderColor: '#777',
//             data: [3, 1, 3, 2, 1, 2, 1]
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });
//   })
//   .catch(function (error) {
//     // handle error
//     console.log("error");
//   });
