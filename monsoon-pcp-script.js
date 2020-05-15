const ctx = document.getElementById("myChart").getContext("2d");
const lineChart = document.getElementById("lineChart").getContext("2d");
const siteSelector = document.getElementById("siteSelector");
const lastUpdate = document.getElementById("lastUpdate");
let buttonListener = document.querySelectorAll(".siteButton");

const precipColor1 = "#537791";
const precipColor2 = "#c1c0b9";

let precipData = {};
let sites = [];
let actualPrecip = [];
let normalPrecip = [];

const currentYear = new Date().getFullYear();

getPrecipData();

// "https://extendsclass.com/api/json-storage/bin/addceda"
// "../../../images/twc/monsoonPCP/2020PCP.json"

// Gets JSON data via Axios and populates precip variables, then builds chart
async function getPrecipData() {
	precipData = await axios.get("../../../images/twc/monsoonPCP/2020PCP.json");
	fillPrecipData();
	buildChart();
	buildLineGraph(0);
	buildSiteSelector();
	getLastUpdate();
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

// publishes latest update to graphs
function getLastUpdate() {
	lastUpdate.innerText = `*** Last Update: ${
		precipData.data.date[precipData.data.date.length - 1]
	}/${currentYear} ***`;
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
					backgroundColor: precipColor1,
					borderColor: precipColor1,
					data: actualPrecip,
				},
				{
					label: "Normal Rainfall",
					backgroundColor: precipColor2,
					borderColor: precipColor2,
					data: normalPrecip,
				},
			],
		},

		// Configuration options go here
		options: {
			title: {
				display: true,
				text: `${currentYear} Monsoon Rainfall vs. Normal`,
				fontSize: 28,
				fontColor: "#666",
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: "Rainfall (inches)",
							fontSize: 14,
						},
					},
				],
			},
			// needed to add graph values and remove hover
			events: false,
			tooltips: {
				enabled: false,
			},
			hover: {
				animationDuration: 0,
			},
			animation: {
				duration: 1,
				onComplete: function () {
					var chartInstance = this.chart,
						ctx = chartInstance.ctx;
					ctx.font = Chart.helpers.fontString(
						Chart.defaults.global.defaultFontSize,
						Chart.defaults.global.defaultFontStyle,
						Chart.defaults.global.defaultFontFamily
					);
					ctx.textAlign = "center";
					ctx.textBaseline = "bottom";

					this.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index) {
							var data = dataset.data[index];
							ctx.fillText(data, bar._model.x, bar._model.y - 5);
						});
					});
				},
			},
			// done with additions
		},
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
					backgroundColor: precipColor1,
					borderColor: precipColor1,
					data: dailyPrecip(site, "actualPrecip"),
					fill: false,
					lineTension: 0,
					pointRadius: 0,
				},
				{
					label: "Normal Rainfall",
					backgroundColor: precipColor2,
					borderColor: precipColor2,
					data: dailyPrecip(site, "normalPrecip"),
					fill: false,
					lineTension: 0,
					pointRadius: 0,
				},
			],
		},

		// Configuration options go here
		options: {
			title: {
				display: true,
				text: `${currentYear} Monsoon Rainfall for ${sites[site]}`,
				fontSize: 28,
				fontColor: "#666",
			},
			events: null,
			tooltips: {
				enabled: false,
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: "Rainfall (inches)",
							fontSize: 14,
						},
					},
				],
			},
		},
	});
};
