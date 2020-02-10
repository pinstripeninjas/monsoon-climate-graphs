const ctx = document.getElementById("myChart").getContext("2d");
const lineChart = document.getElementById("lineChart").getContext("2d");
const siteSelector = document.getElementById("siteSelector");
let buttonListener = document.querySelectorAll(".siteButton");

let precipData = {};
let sites = [];
let actualPrecip = [];
let normalPrecip = [];

getPrecipData();

// Gets JSON data via Axios and populates precip variables, then builds chart
async function getPrecipData() {
	precipData = await axios.get("https://api.myjson.com/bins/j1wy8");
	fillPrecipData();
	buildChart();
	buildLineGraph(0);
	buildSiteSelector();
}

// fill arrays with stuff
const fillPrecipData = () => {
	sites = buildSites(precipData.data);
	actualPrecip = buildPrecip(precipData.data, "actualPrecip");
	normalPrecip = buildPrecip(precipData.data, "normalPrecip");
};

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

// build daily precip data for line chart
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

// build site selector bar at bottom of line chart
const buildSiteSelector = () => {
	for (let i = 0; i < sites.length; i++) {
		const newDiv = document.createElement("div");
		newDiv.setAttribute("datanumber", i);
		newDiv.innerText = sites[i];
		newDiv.classList.add("siteButton");
		if (i === 0) {
			newDiv.classList.add("active");
		}
		siteSelector.append(newDiv);
		buttonListener = document.querySelectorAll(".siteButton");
	}
	for (let i = 0; i < buttonListener.length; i++) {
		buttonListener[i].addEventListener("click", changeData);
	}
};

// listener that changes the data when site button clicked
function changeData(event) {
	for (let i = 0; i < buttonListener.length; i++) {
		buttonListener[i].classList.remove("active");
	}
	this.classList.add("active");
	const newSite = event.target.attributes.datanumber.value;
	buildLineGraph(newSite);
}

// uses chart JS to build total precip chart
const buildChart = () => {
	const chart = new Chart(ctx, {
		type: "bar",

		data: {
			labels: sites,
			datasets: [
				{
					label: "Actual Rainfall",
					backgroundColor: "#057ff3",
					borderColor: "#057ff3",
					data: actualPrecip
				},
				{
					label: "Normal Rainfall",
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
				text: "2019 Monsoon Rainfall vs. Normal",
				fontSize: 28,
				fontColor: "#666"
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: "Rainfall (inches)",
							fontSize: 14
						}
					}
				]
			}
		}
	});
};

// Builds line graph by taking the site number as an argument
const buildLineGraph = (site) => {
	const chart = new Chart(lineChart, {
		type: "line",

		data: {
			labels: precipData.data.date,
			datasets: [
				{
					label: "Actual Rainfall",
					backgroundColor: "#057ff3",
					borderColor: "#057ff3",
					data: dailyPrecip(site, "actualPrecip"),
					fill: false,
					lineTension: 0,
					pointRadius: 0
				},
				{
					label: "Normal Rainfall",
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
			},
			events: null,
			tooltips: {
				enabled: false
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: "Rainfall (inches)",
							fontSize: 14
						}
					}
				]
			}
		}
	});
};
