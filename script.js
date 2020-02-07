const ctx = document.getElementById("myChart").getContext("2d");
const lineChart = document.getElementById("lineChart").getContext("2d");
const siteSelector = document.getElementById("siteSelector");

let precipData = {};
let sites = [];
let actualPrecip = [];
let normalPrecip = [];

getPrecipData();

// fill arrays with stuff
const fillPrecipData = () => {
	sites = buildSites(precipData.data);
	actualPrecip = buildPrecip(precipData.data, "actualPrecip");
	normalPrecip = buildPrecip(precipData.data, "normalPrecip");
};

// Gets JSON data via Axios and populates precip variables, then builds chart
async function getPrecipData() {
	precipData = await axios.get("https://api.myjson.com/bins/j1wy8");
	fillPrecipData();
	buildChart();
	buildLineGraph(0);
	buildSiteSelector();
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

const dailyPrecip = (site, precipType) => {
	const newPrecipArray = [];
	let newPrecipTotal = 0;
	for (let i = 0; i < precipData.data.data[site][precipType].length; i++) {
		const currentPrecipAmount = precipData.data.data[site][precipType][i];
		if (typeof currentPrecipAmount === "number") {
			newPrecipTotal += currentPrecipAmount;
			newPrecipArray.push(newPrecipTotal);
		} else {
			newPrecipArray.push(newPrecipTotal);
		}
	}
	return newPrecipArray;
};

const buildSiteSelector = () => {
	for (let i = 0; i < sites.length; i++) {
		const newDiv = document.createElement("div");
		newDiv.setAttribute("datanumber", i);
		newDiv.innerText = sites[i];
		siteSelector.append(newDiv);
	}
};

// uses chart JS to build total precip chart
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
					backgroundColor: "#888",
					borderColor: "#888",
					data: normalPrecip
				}
			]
		},

		// Configuration options go here
		options: {
			title: {
				display: true,
				text: "2019 Total Monsoon Precipitation vs. Normal",
				fontSize: 28,
				fontColor: "#666"
			}
		}
	});
};

const buildLineGraph = (site) => {
	const chart = new Chart(lineChart, {
		type: "line",

		data: {
			labels: precipData.data.date,
			datasets: [
				{
					label: "Actual Precip",
					backgroundColor: "#057ff3",
					borderColor: "#057ff3",
					data: dailyPrecip(site, "actualPrecip"),
					fill: false,
					lineTension: 0,
					pointRadius: 0
				},
				{
					label: "Normal Precip",
					backgroundColor: "#888",
					borderColor: "#888",
					data: dailyPrecip(site, "normalPrecip"),
					fill: false,
					lineTension: 0,
					pointRadius: 0
				}
			]
		},

		// Configuration options go here
		options: {
			title: {
				display: true,
				text: `2019 Monsoon Rainfall for ${sites[site]}`,
				fontSize: 28,
				fontColor: "#666"
			}
		}
	});
};
