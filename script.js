const ctx = document.getElementById("myChart").getContext("2d");

let precipData = {};
let sites = [];
let actualPrecip = [];
let normalPrecip = [];

getPrecipData();
//buildChart();

// fill arrays with stuff
const fillPrecipData = () => {
	return new Promise((resolve, reject) => {
		sites = buildSites(precipData.data);
		actualPrecip = buildPrecip(precipData.data, "actualPrecip");
		normalPrecip = buildPrecip(precipData.data, "normalPrecip");
		resolve();
	});
};

// Gets JSON data via Axios and populates precip variables
async function getPrecipData() {
	precipData = await axios.get("https://api.myjson.com/bins/qgwqy");
	const bullshit = await fillPrecipData();
	buildChart();
}

// Builds the list of sites as an array
const buildSites = (precipData) => {
	const sites = [];
	for (site of precipData.data) {
		sites.push(site.name);
	}
	return sites;
};

// Builds both the actual and normal precip arrays
const buildPrecip = (precipData, precipType) => {
	const precipArray = [];
	for (site of precipData.data) {
		let totalPrecipAmount = 0;
		for (precip of site[precipType]) {
			if (typeof precip === "number") {
				totalPrecipAmount += precip;
			}
		}
		precipArray.push(Number(totalPrecipAmount.toFixed(2)));
	}
	return precipArray;
};

const buildChart = () => {
	const chart = new Chart(ctx, {
		type: "bar",

		data: {
			labels: sites,
			datasets: [
				{
					label: "Actual Precip",
					backgroundColor: "#057ff3",
					borderColor: "#057ff3",
					data: actualPrecip
				},
				{
					label: "Normal Precip",
					backgroundColor: "#777",
					borderColor: "#777",
					data: normalPrecip
				}
			]
		},

		// Configuration options go here
		options: {}
	});
};
