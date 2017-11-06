/*
 * Note:
 * 	terms, labels and identifiers representing an indirect reference
 * 	to commercial information have been blacked out with symbols
 * 	#### **** %%%% and so on
 */

/*
 * "Graph" Web Page, Javascript
 * Author: Pasha Bolokhov <pasha.bolokhov@gmail.com>
 */

var INITIAL_AVERAGING_PERIOD = 30;		// const
var MAX_REASONABLE_AVERAGING_PERIOD = 100000;	// const

// Load the Visualization API and the necessary packages
google.charts.load('current', { packages: ['corechart', 'line', 'controls'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(function () {
	angular.bootstrap(document.body, ['GraphApp']);
});


/*
 * Graph Module
 */
graphApp = angular.module('GraphApp', ['ngMaterial']);


// Initializes the page overall
graphApp.controller('MainController', function ($scope, $rootScope) {

	/*
	 * Permanent data initialization
	 */
	$rootScope.max_reasonable_averaging_period = MAX_REASONABLE_AVERAGING_PERIOD;

	// we define here the set of scopes to make it available throughout
	$scope.charts = {};

	// common appearance of charts
	$rootScope.common_chart_options = {
		width: '100%',
		height: 500,
		vAxis: { viewWindow: { min: 0 } },
		chartArea: { 'top': '4%', 'width': '60%', 'height': '80%' },
		legend: { position: 'none' },
		lineWidth: 3,
		series: {
			0: { },
			1: { curveType: 'function', lineWidth: 4 },
			2: { curveType: 'function', lineWidth: 4 }
		},
		interpolateNulls: true
	};
	$rootScope.common_slider_options = {
		'filterColumnLabel': 'Date',
		'ui': {
			'label': '',		// don't need a label really
			'chartOptions': {
				'width': '100%',
				'height': '100',
				vAxis: { viewWindow: { min: 0 } },
				series: {
					0: {},
					1: { curveType: 'function' },
					2: { curveType: 'function' }
				},
				interpolateNulls: true
			}
		}
	};


	/*
	 * Resettable data initialization
	 */
	$rootScope.waiting = 0;
	$scope.recentDays = 365;
	$rootScope.whatRange = function () {
		//
		// The value "0" of 'recentDays' is special and means get all data,
		// any other value means only fetch a year's worth
		//
		return $scope.recentDays == 0 ? "all" : "year";
	};

	/*
	 * Functions assigned to buttons
	 */
	// shift to the recent specified period of days (week, month, year)
	$scope.recentView = function () {
		//
		// if asked to draw "all", we need to fetch all data,
		// can't just re-draw existing data
		//
		if ($rootScope.whatRange() == "all") {
			// relax the sliders
			for (chart in $scope.charts) {
				$scope.charts[chart].slider.setState({
					'range': {
						'start': undefined,
						'end': undefined
					}
				});
			}
			for (chart in $scope.charts) {
				$scope.charts[chart].refresh();
			}

			return;
		}

		//
		// for any other requested range, just zoom in on it
		//
		var today = new Date();
		var recent = new Date();
		recent.setDate(today.getDate() - $scope.recentDays);

		// shift the sliders
		for (chart in $scope.charts) {
			$scope.charts[chart].slider.setState({
				'range': {
					'start': recent,
					'end': today
				}
			});
			$scope.charts[chart].slider.draw();
		}
	};
});


// Initializes Downloads section
graphApp.controller('DownloadsController', function ($scope, $rootScope, $http, $q) {

	/*
	 * Permanent data initialization
	 */
	$scope.charts.downloads = $scope;		// store this scope

	/*
	 * Resettable data initialization
	 */
	$scope.setup = function() {
		// Initialization
		$scope.period = INITIAL_AVERAGING_PERIOD;
		$scope.product = "all";
	};
	$scope.setup();

	/*
	 * Function to re-fetch the data
	 */
	$scope.refresh = function() {
		loadDownloadsData($rootScope.whatRange(), $scope, $rootScope, $http, $q).then(
			function(data) {		// on success
				$scope.dash.draw(data);
			},
			function(reason) {		// on failure
			}
		);		
	}

	initDownloadsChart($scope, $rootScope);
	$scope.refresh();
});


// Initializes ______ section
graphApp.controller('______Controller', function ($scope, $rootScope, $http, $q) {

	/*
	 * Permanent data initialization
	 */
	$scope.charts.quotes = $scope;		// store this scope

	/*
	 * Resettable data initialization
	 */
	$scope.setup = function() {
		// Initialization
		$scope.period = INITIAL_AVERAGING_PERIOD;
		$scope.qtype = "all";
	};
	$scope.setup();

	/*
	 * Function to re-fetch the data
	 */
	$scope.refresh = function() {
		load______Data($rootScope.whatRange(), $scope, $rootScope, $http, $q).then(
			function(data) {		// on success
				$scope.dash.draw(data);
			},
			function(reason) {		// on failure
			}
		);		
	}

	init______Chart($scope, $rootScope);
	$scope.refresh();
});


// Initializes ZZZZ ______ section
graphApp.controller('ZZZZ______Controller', function ($scope, $rootScope, $http, $q) {

	/*
	 * Permanent data initialization
	 */
	$scope.charts.zzzz_quotes = $scope;		// store this scope

	/*
	 * Resettable data initialization
	 */
	$scope.setup = function() {
		// Initialization
		$scope.period = INITIAL_AVERAGING_PERIOD;
		$scope.qtype = "all";
	};
	$scope.setup();

	/*
	 * Function to re-fetch the data
	 */
	$scope.refresh = function() {
		loadZZZZ______Data($rootScope.whatRange(), $scope, $rootScope, $http, $q).then(
			function(data) {		// on success
				$scope.dash.draw(data);
			},
			function(reason) {		// on failure
			}
		);		
	}

	initZZZZ______Chart($scope, $rootScope);
	$scope.refresh();
});


// Initializes Trials section
graphApp.controller('____Controller', function ($scope, $rootScope, $http, $q) {

	/*
	 * Permanent data initialization
	 */
	$scope.charts.____ = $scope;		// store this scope

	/*
	 * Resettable data initialization
	 */
	$scope.setup = function() {
		// Initialization
		$scope.period = INITIAL_AVERAGING_PERIOD;
	};
	$scope.setup();

	/*
	 * Function to re-fetch the data
	 */
	$scope.refresh = function() {
		load____Data($rootScope.whatRange(), $scope, $rootScope, $http, $q).then(
			function(data) {		// on success
				$scope.dash.draw(data);
			},
			function(reason) {		// on failure
			}
		);		
	}

	init____Chart($scope, $rootScope);
	$scope.refresh();
});

graphApp.controller('#####Controller', function ($scope, $rootScope, $http,
$q) {
        $scope.charts.%%%%% = $scope;               // store this scope

        /*
 *          * Function to re-fetch the data
 *                   */
        $scope.refresh = function() {
                load#####Data($scope, $rootScope, $http, $q).then(
                        function(data) {                // on success
                                $scope.dash.draw(data);
                        },
                        function(reason) {              // on failure
                        }
                );
        }

        init#####Chart($scope, $rootScope);
        $scope.refresh();
});

// Creates the necessary objects for the downloads chart
function initDownloadsChart($scope, $rootScope) {
	// Create the dashboard
	var dash = new google.visualization.Dashboard(
		document.getElementById('downloads_dashboard_div')
	);

	// Copy generic options and set specific options for the chart
	var options = JSON.parse(JSON.stringify($rootScope.common_chart_options));
	options.series[0].color = '#3366cc';
	options.series[1].color = '#dc3912';

	// Instantiate the chart
	var chart = new google.visualization.ChartWrapper({
		'chartType': 'LineChart',
		'containerId': 'downloads_graph_div',
		'options': options
	});

	// Create the slider
	var slider_options = JSON.parse(JSON.stringify($rootScope.common_slider_options));
	slider_options.ui.chartOptions.series[0].color = '#1e90ff';
	slider_options.ui.chartOptions.series[1].color = '#ff7f50';
	var dateRangeSlider = new google.visualization.ControlWrapper({
		'controlType': 'ChartRangeFilter',
		'containerId': 'downloads_slide_div',
		'options': slider_options
	});

	// Establish the dependency
	dash.bind(dateRangeSlider, chart);

	// Return the created dashboard
	$scope.chart = chart;
	$scope.slider = dateRangeSlider;
	$scope.dash = dash;
}


// Creates the necessary objects for the quotes chart
function init______Chart($scope, $rootScope) {
	// Create the dashboard
	var dash = new google.visualization.Dashboard(
		document.getElementById('quotes_dashboard_div')
	);

	// Set options for the chart
	var options = JSON.parse(JSON.stringify($rootScope.common_chart_options));
	options.series[0].color = '#7f00ff';
	options.series[1].color = '#ff00bf';

	// Instantiate the chart
	var chart = new google.visualization.ChartWrapper({
		'chartType': 'LineChart',
		'containerId': 'quotes_graph_div',
		'options': options
	});

	// Create the slider
	var slider_options = JSON.parse(JSON.stringify($rootScope.common_slider_options));
	slider_options.ui.chartOptions.series[0].color = '#9400d3';
	slider_options.ui.chartOptions.series[1].color = '#ff8000';
	var dateRangeSlider = new google.visualization.ControlWrapper({
		'controlType': 'ChartRangeFilter',
		'containerId': 'quotes_slide_div',
		'options': slider_options
	});

	// Establish the dependency
	dash.bind(dateRangeSlider, chart);

	// Return the created dashboard
	$scope.chart = chart;
	$scope.slider = dateRangeSlider;
	$scope.dash = dash;
}


// Creates the necessary objects for the quotes chart
function initZZZZ______Chart($scope, $rootScope) {
	// Create the dashboard
	var dash = new google.visualization.Dashboard(
		document.getElementById('zzzz_quotes_dashboard_div')
	);

	// Set options for the chart
	var options = JSON.parse(JSON.stringify($rootScope.common_chart_options));
	options.curveType = 'function';
	options.seriesType = 'bars';
	options.series = {
	        0: { color: '#99ccff' },
	        1: { color: '#00fabb', type: 'line' }
	};
	options.bar = { groupWidth: '96%' };		// make the histogram bars look thicker

	// Instantiate the chart
	var chart = new google.visualization.ChartWrapper({
		'chartType': 'ComboChart',
		'containerId': 'zzzz_quotes_graph_div',
		'options': options
	});

	// Create the slider
	var slider_options = JSON.parse(JSON.stringify($rootScope.common_slider_options));
	slider_options.ui.chartOptions.series = {
		0: { color: '#00ccff' },
		1: { color: '#00ff66', type: 'line' }
	};
	slider_options.ui.chartType = 'ComboChart';
	slider_options.ui.chartOptions.seriesType = 'bars';
	slider_options.ui.chartOptions.curveType = 'function';
	slider_options.ui.chartOptions.bar = { groupWidth: '100%' };
	var dateRangeSlider = new google.visualization.ControlWrapper({
		'controlType': 'ChartRangeFilter',
		'containerId': 'zzzz_quotes_slide_div',
		'options': slider_options,
	});

	// Establish the dependency
	dash.bind(dateRangeSlider, chart);

	// Return the created dashboard
	$scope.chart = chart;
	$scope.slider = dateRangeSlider;
	$scope.dash = dash;
}


// Creates the necessary objects for the ____ chart
function init____Chart($scope, $rootScope) {
	// Create the dashboard
	var dash = new google.visualization.Dashboard(
		document.getElementById('_____dashboard_div')
	);

	// Set options for the chart
	var options = JSON.parse(JSON.stringify($rootScope.common_chart_options));
	options.series[0].color = '#3366cc';
	options.series[1].color = '#cccccc';
	options.series[2].color = '#dc3912';
	options.series[0].curveType = 'function';
	options.series[0].lineWidth = 4;

	// Instantiate the chart
	var chart = new google.visualization.ChartWrapper({
		'chartType': 'LineChart',
		'containerId': '_____graph_div',
		'options': options
	});

	// Create the slider
	var slider_options = JSON.parse(JSON.stringify($rootScope.common_slider_options));
	slider_options.ui.chartOptions.series[0].color = '#1e90ff';
	slider_options.ui.chartOptions.series[1].color = '#aaaaaa';
	slider_options.ui.chartOptions.series[2].color = '#ff7f50';
	var dateRangeSlider = new google.visualization.ControlWrapper({
		'controlType': 'ChartRangeFilter',
		'containerId': '_____slide_div',
		'options': slider_options
	});

	// Establish the dependency
	dash.bind(dateRangeSlider, chart);

	// Return the created dashboard
	$scope.chart = chart;
	$scope.slider = dateRangeSlider;
	$scope.dash = dash;
}

function init#####Chart($scope, $rootScope) {
    var dash = new google.visualization.Dashboard(
                document.getElementById('%%%%%_dashboard_div')
    );

    var options = JSON.parse(JSON.stringify($rootScope.common_chart_options));

    options.series[0].color = '#3366cc';
    options.series[1].color = '#dc3912';
    options.series[0].curveType = 'function';
    options.series[0].lineWidth = 4;

    var chart = new google.visualization.ChartWrapper({
                'chartType': 'LineChart',
                'containerId': '%%%%%_graph_div',
                'options': options
    });

    $scope.chart = chart;
    $scope.dash = dash;
}


// Obtain and compile together the data for the downloads chart
function loadDownloadsData(range, $scope, $rootScope, $http, $q) {
	// Check that we have the averaging period
	if (!$scope.period) {
		$rootScope.error = "Averaging period is required";
		return;
	}
		
	// Indicate we are waiting for data
	$rootScope.waiting++;

	// Send the request
	return $q(function(resolve, reject) {
		var paramString = "action=graph_ajax" + "&" +
					"chart=downloads" + "&" +
					"range=" + range + "&" +
					"period=" + $scope.period.toString() + "&" +
					"product=" + $scope.product.toString();
		$http({
			method: 'POST',
			url: '/cgi-bin/***_manage.cgi',
			headers: {
				 'Content-type': 'application/x-www-form-urlencoded'
			},
			data: paramString
		})
		.then(
		function(response) {
			// Check if there was any back-end error
			if (response.data["error"]) {
				$rootScope.error = response.data["error"];
				console.log(response.data["error"]);
				reject(response.data["error"]);
				return;
			}
		
			// Create the data tables
			if (!response.data["downloads"] || !response.data["aver_downloads"]) {
				$rootScope.error = "Incomplete data from server";
				reject($rootScope.error);
				return;
			}
			var json_downloads = response.data["downloads"];
			var json_aver_downloads = response.data["aver_downloads"];
		
			// Initialize the data tables
			var downloads = new google.visualization.DataTable();
			downloads.addColumn('date', 'Date');
			downloads.addColumn('number', 'Downloaded');
			for (r = 0; r < json_downloads.length; r++) {
				downloads.addRow([
					new Date(
						json_downloads[r].year,
						json_downloads[r].month - 1,
						json_downloads[r].day
					),
					json_downloads[r].number
				]);
			}
		
			var aver_downloads = new google.visualization.DataTable();
			aver_downloads.addColumn('date', 'Date');
			aver_downloads.addColumn('number', 'Average Downloaded');
			for (r = 0; r < json_aver_downloads.length; r++) {
				aver_downloads.addRow([
					new Date(
						json_aver_downloads[r].year,
						json_aver_downloads[r].month - 1,
						json_aver_downloads[r].day
					),
					json_aver_downloads[r].number
				]);
			}
		
			combined_downloads = google.visualization.data.join(downloads, aver_downloads, 'full',
				[ [ 0, 0 ] ], [ 1 ], [ 1 ]);
			resolve(combined_downloads);
		},
		function(response) {
			console.log(response.data);
			$rootScope.error = "Error accessing the server: " + response.status;
			reject($rootScope.error);
			return null;
		})
		.finally(function() {
			// Indicate that we have a reply
			if ($rootScope.waiting) {
				$rootScope.waiting--;
			}
		});
	});
}


// Obtain and compile together the data for the quotes chart
function load______Data(range, $scope, $rootScope, $http, $q) {
	// Check that we have the averaging period
	if (!$scope.period) {
		$rootScope.error = "Averaging period is required";
		return;
	}
		
	// Indicate we are waiting for data
	$rootScope.waiting++;

	// Send the request
	return $q(function(resolve, reject) {
		$http({
			method: 'POST',
			url: '/cgi-bin/***_manage.cgi',
			headers: {
				 'Content-type': 'application/x-www-form-urlencoded'
			},
			data: "action=graph_ajax" + "&" +
			      "chart=quotes" + "&" +
			      "range=" + range + "&" +
			      "period=" + $scope.period.toString() + "&" +
			      "qtype=" + $scope.qtype.toString()
		})
		.then(
		function(response) {
			// Check if there was any back-end error
			if (response.data["error"]) {
				$rootScope.error = response.data["error"];
				console.log(response.data["error"]);
				reject(response.data["error"]);
				return;
			}

			// Create the data tables
			if (!response.data["quotes"] || !response.data["aver_quotes"]) {
				$rootScope.error = "Incomplete data from server";
				reject($rootScope.error);
				return;
			}
			var json_quotes = response.data["quotes"];
			var json_aver_quotes = response.data["aver_quotes"];
			var json_plimus_quotes = response.data["plimus_quotes"];
			var json_aver_plimus_quotes = response.data["aver_plimus_quotes"];

			// Initialize the data tables
			var quotes = new google.visualization.DataTable();
			quotes.addColumn('date', 'Date');
			quotes.addColumn('number', '______');
			for (r = 0; r < json_quotes.length; r++) {
				quotes.addRow([
					new Date(
						json_quotes[r].year,
						json_quotes[r].month - 1,
						json_quotes[r].day
					),
					json_quotes[r].number
				]);
			}

			var aver_quotes = new google.visualization.DataTable();
			aver_quotes.addColumn('date', 'Date');
			aver_quotes.addColumn('number', 'Averaged ______');
			for (r = 0; r < json_aver_quotes.length; r++) {
				aver_quotes.addRow([
					new Date(
						json_aver_quotes[r].year,
						json_aver_quotes[r].month - 1,
						json_aver_quotes[r].day
					),
					json_aver_quotes[r].number
				]);
			}

			combined_quotes = google.visualization.data.join(quotes, aver_quotes, 'full',
				[ [ 0, 0 ] ], [ 1 ], [ 1 ]);
			resolve(combined_quotes);
		},
		function(response) {
			console.log(response.data);
			$rootScope.error = "Error accessing the server: " + response.status;
			reject($rootScope.error);
			return null;
		})
		.finally(function() {
			// Indicate that we have a reply
			if ($rootScope.waiting) {
				$rootScope.waiting--;
			}
		});
	});
}


// Obtain and compile together the data for the zzzz quotes chart
function loadZZZZ______Data(range, $scope, $rootScope, $http, $q) {
	// Check that we have the averaging period
	if (!$scope.period) {
		$rootScope.error = "Averaging period is required";
		return;
	}
		
	// Indicate we are waiting for data
	$rootScope.waiting++;

	// Send the request
	return $q(function(resolve, reject) {
		$http({
			method: 'POST',
			url: '/cgi-bin/***_manage.cgi',
			headers: {
				 'Content-type': 'application/x-www-form-urlencoded'
			},
			data: "action=graph_ajax" + "&" +
			      "chart=zzzz_quotes" + "&" +
			      "range=" + range + "&" +
			      "period=" + $scope.period.toString() + "&" +
			      "qtype=" + $scope.qtype.toString()
		})
		.then(
		function(response) {
			// Check if there was any back-end error
			if (response.data["error"]) {
				$rootScope.error = response.data["error"];
				console.log(response.data["error"]);
				reject(response.data["error"]);
				return;
			}
		
			// Create the data tables
			if (!response.data["zzzz_quotes"] || !response.data["aver_zzzz_quotes"]) {
				$rootScope.error = "Incomplete data from server";
				reject($rootScope.error);
				return;
			}
			var json_zzzz_quotes = response.data["zzzz_quotes"];
			var json_aver_zzzz_quotes = response.data["aver_zzzz_quotes"];
		
			// Initialize the data tables
			var zzzz_quotes = new google.visualization.DataTable();
			zzzz_quotes.addColumn('date', 'Date');
			zzzz_quotes.addColumn('number', 'ZZZZ ______');
			for (r = 0; r < json_zzzz_quotes.length; r++) {
				zzzz_quotes.addRow([
					new Date(
						json_zzzz_quotes[r].year,
						json_zzzz_quotes[r].month - 1,
						json_zzzz_quotes[r].day
					),
					json_zzzz_quotes[r].number
				]);
			}
		
			var aver_zzzz_quotes = new google.visualization.DataTable();
			aver_zzzz_quotes.addColumn('date', 'Date');
			aver_zzzz_quotes.addColumn('number', 'Average ZZZZ ______');
			for (r = 0; r < json_aver_zzzz_quotes.length; r++) {
				aver_zzzz_quotes.addRow([
					new Date(
						json_aver_zzzz_quotes[r].year,
						json_aver_zzzz_quotes[r].month - 1,
						json_aver_zzzz_quotes[r].day
					),
					json_aver_zzzz_quotes[r].number
				]);
			}
		
			combined_zzzz_quotes = google.visualization.data.join(zzzz_quotes, aver_zzzz_quotes, 'full',
				[ [ 0, 0 ] ], [ 1 ], [ 1 ]);
			resolve(combined_zzzz_quotes);
		},
		function(response) {
			console.log(response.data);
			$rootScope.error = "Error accessing the server: " + response.status;
			reject($rootScope.error);
			return null;
		})
		.finally(function() {
			// Indicate that we have a reply
			if ($rootScope.waiting) {
				$rootScope.waiting--;
			}
		});
	});
}


// Obtain and compile together the data for the ____ chart
function load____Data(range, $scope, $rootScope, $http, $q) {
	// Check that we have the averaging period
	//if (!$scope.period) {
	//	$rootScope.error = "Averaging period is required";
	//	return;
	//}
		
	// Indicate we are waiting for data
	$rootScope.waiting++;

	// Send the request
	return $q(function(resolve, reject) {
		var paramString = "action=graph_ajax" + "&" +
					"chart=____" + "&" +
					"range=" + range + "&" +
					"period=" + $scope.period.toString();
		$http({
			method: 'POST',
			url: '/cgi-bin/***_manage.cgi',
			headers: {
				 'Content-type': 'application/x-www-form-urlencoded'
			},
			data: paramString
		})
		.then(
		function(response) {
			// Check if there was any back-end error
			if (response.data["error"]) {
				$rootScope.error = response.data["error"];
				console.log(response.data["error"]);
				reject(response.data["error"]);
				return;
			}
		
			// Create the data tables
			if (!response.data["zzzz"] || !response.data["*********"]) {
				$rootScope.error = "Incomplete data from server";
				reject($rootScope.error);
				return;
			}
			var json_zzzz = response.data["zzzz"];
			var json_********* = response.data["*********"];
			var json_unzzzz = response.data["unzzzz"];
		
			// Initialize the data tables
			var zzzz = new google.visualization.DataTable();
			zzzz.addColumn('date', 'Date');
			zzzz.addColumn('number', 'Valid');
			for (r = 0; r < json_zzzz.length; r++) {
				zzzz.addRow([
					new Date(
						json_zzzz[r].year,
						json_zzzz[r].month - 1,
						json_zzzz[r].day
					),
					json_zzzz[r].number
				]);
			}
		
			var ********* = new google.visualization.DataTable();
			*********.addColumn('date', 'Date');
			*********.addColumn('number', '*********');
			for (r = 0; r < json_*********.length; r++) {
				*********.addRow([
					new Date(
						json_*********[r].year,
						json_*********[r].month - 1,
						json_*********[r].day
					),
					json_*********[r].number
				]);
			}
		
			var unzzzz = new google.visualization.DataTable();
			unzzzz.addColumn('date', 'Date');
			unzzzz.addColumn('number', 'Expired');
			for (r = 0; r < json_unzzzz.length; r++) {
				unzzzz.addRow([
					new Date(
						json_unzzzz[r].year,
						json_unzzzz[r].month - 1,
						json_unzzzz[r].day
					),
					json_unzzzz[r].number
				]);
			}
		
			combined_____ = google.visualization.data.join(zzzz, *********, 'full',
				[ [ 0, 0 ] ], [ 1 ], [ 1 ]);
			combined_____ = google.visualization.data.join(combined_____, unzzzz, 'full',
				[ [ 0, 0 ] ], [ 1, 2 ], [ 1 ]);
			resolve(combined_____);
		},
		function(response) {
			console.log(response.data);
			$rootScope.error = "Error accessing the server: " + response.status;
			reject($rootScope.error);
			return null;
		})
		.finally(function() {
			// Indicate that we have a reply
			if ($rootScope.waiting) {
				$rootScope.waiting--;
			}
		});
	});
}

function load#####Data($scope, $rootScope, $http, $q) {

    $rootScope.waiting++;

    return $q(function(resolve, reject) {
        var paramString = "action=stat_%%%%%" + "&" +
            "graph=%%%%%" + "&" +
            "search_user=10" + "&" +
            "search_interval=month";
        $http({
            method: 'POST',
            url: '/cgi-bin/***_manage.cgi',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            data: paramString
        })
        .then(
        function(response) {
            if (response.data["error"]) {
                                $rootScope.error = response.data["error"];
                                console.log(response.data["error"]);
                                reject(response.data["error"]);
                                return;
            }

            if (!response.data["%%%%%"]) {
                $rootScope.error = "Incomplete data from server";
                reject($rootScope.error);
                return;
            }
            var json_%%%%% = response.data["%%%%%"];

            var %%%%% = new google.visualization.DataTable();
            %%%%%.addColumn('date', 'Date');
            %%%%%.addColumn('number', '@@@@ USD');
            for (r = 0; r < json_%%%%%.length; r++) {
                %%%%%.addRow([ new Date(
                                  json_%%%%%[r].year,
                                  json_%%%%%[r].month - 1,
                                  json_%%%%%[r].day ),
                                  json_%%%%%[r].number
                ]);
            }

            combined_%%%%% = google.visualization.data.join(%%%%%, %%%%%, 'full', [ [ 0, 0 ] ], [ 1 ], [ 1 ]);
            resolve(combined_%%%%%);
        },
        function(response) {
            console.log(response.data);
            $rootScope.error = "Error accessing the server: " + response.status;
                reject($rootScope.error);
                return null;
            })
        .finally(function() {
            if ($rootScope.waiting) {
                $rootScope.waiting--;
            }                                                                           });
    });
}

