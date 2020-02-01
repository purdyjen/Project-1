$(document).ready(function () {

	am4core.ready(function () {


		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end

		// Create map instance
		var chart = am4core.create("chartdiv", am4maps.MapChart);

		// Set map definition
		chart.geodata = am4geodata_worldLow;

		// Set projection
		chart.projection = new am4maps.projections.Miller();

		// Create map polygon series
		var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

		// Exclude Antartica
		polygonSeries.exclude = ["AQ"];

		// Make map load polygon (like country names) data from GeoJSON
		polygonSeries.useGeodata = true;

		// Configure series
		var polygonTemplate = polygonSeries.mapPolygons.template;

		polygonTemplate.tooltipText = "{name}";
		polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

		// Create hover state and set alternative fill color
		var hs = polygonTemplate.states.create("hover");
		hs.properties.fill = chart.colors.getIndex(0);

		// POPUP ON CLICK  
		polygonTemplate.events.on("hit", function (ev) {
			chart.closeAllPopups();
			var popup = chart.openPopup(ev.target.dataItem.dataContext.name);
			popup.left = ev.svgPoint.x + 15;
			popup.top = ev.svgPoint.y + 15;
			$(".ampopup-header").hide();
			
			

			// grabs the country id for geoDB api 
			countryid = ev.target.dataItem.dataContext.id
			// settings to pass to geoDB ajax call
			var geoDBsettings = {
				"async": true,
				"crossDomain": true,
				"url": "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/" + countryid,
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
					"x-rapidapi-key": "8c82e4dd37msh31e61bbc05c60afp12c20fjsn273f40e54380"
				}
			};

			var ccSettings = {
				"async": true,
				"crossDomain": true,
				"url": "https://countries-cities.p.rapidapi.com/location/country/" + countryid + "?format=json",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "countries-cities.p.rapidapi.com",
					"x-rapidapi-key": "8c82e4dd37msh31e61bbc05c60afp12c20fjsn273f40e54380"
				}
			};

			// cc ajax call
			$.ajax(ccSettings).done(function (ccResoponse) {
				// console.log(ccResoponse);
				// variables set from cc ajax response object
				var capital = ccResoponse.capital;
				var pop = ccResoponse.population;

				// geoDB ajax call
				$.ajax(geoDBsettings).done(function (geoDBresponse) {
					// console.log(geoDBresponse);

					// variables set from geoDB ajax response object
					var currency = geoDBresponse.data.currencyCodes[0];
					var flag = geoDBresponse.data.flagImageUri;

					// settings for currency exchange ajax call
					// var currencyXsettings = {
					// 	"async": true,
					// 	"crossDomain": true,
					// 	"url": "https://currency-converter5.p.rapidapi.com/currency/historical/2020-01-30?format=json&to=" + currency + "&from=USD&amount=1",
					// 	"method": "GET",
					// 	"headers": {
					// 		"x-rapidapi-host": "currency-converter5.p.rapidapi.com",
					// 		"x-rapidapi-key": "8c82e4dd37msh31e61bbc05c60afp12c20fjsn273f40e54380"
					// 	}
					// }
					// currency exchange ajax call
					// $.ajax(currencyXsettings).done(function (currencyXresponse) {
					// 	console.log(currencyXresponse);
					// 	console.log(currencyXresponse.rates.RUB.rate);

					// set the variable for the exchange rate 
					// var rate = currencyXresponse.rates.RUB.rate;

					// inital tag creation
					var capitalInfo = $("<p>").text("Capital: " + capital);
					var popInfo = $("<p>").text("Population: " + pop);
					var currencyInfo = $("<p>").text("Currency: " + currency);
					// var currencyRate = $("<p>").text("Currency exchange rate to USD: " + rate)
					var countryFlag = $("<img>").attr("src", flag);
					countryFlag.addClass("flag-img");

					// appending tags to the overall div
					var dataDump = $("<div>");
					dataDump.append(capitalInfo, popInfo, currencyInfo, countryFlag);

					// appending dataDump to popup
					$(".ampopup-content").append(dataDump);
				});
			});
		})

		//yelp featured event api
		// var eventSettings = {
		// 	"async": true,
		// 	"crossDomain": true,
		// 	"url": "https://yelpapiserg-osipchukv1.p.rapidapi.com/getFeaturedEvent" + countryid,
		// 	"method": "POST",
		// 	"headers": {
		// 		"x-rapidapi-host": "YelpAPIserg-osipchukV1.p.rapidapi.com",
		// 		"x-rapidapi-key": "de7f14a889msh47739a53de91d23p176494jsn5618424a7788",
		// 		"content-type": "application/x-www-form-urlencoded"
		// 	},
		// 	"data": {
		// 		"locale": "search",
		// 		"location": "city",
		// 		"coordinates": "countryid",
		// 		"accessToken": "FVtUcdjPbjyM3FzTfJ6z6w8fRLyWucMi_1rFrNntVL7m15VCiZVGznGIIuRbbC0KPcnAwbuu6S2gKqFmaqf8u5tZvSew4DD-747alCICgvLc_FW81hOqTWrUiVgrXnYx"
		// 	}
		// }

		// // $.ajax(EventSettings).done(function (response) {
		// $.ajax(eventSettings).done(function (response) {
		// 	console.log(response);
		// });

		// //yelp autocomplete api
		// var autocompleteSettings = {
		// 	"async": true,
		// 	"crossDomain": true,
		// 	"url": "https://yelpapiserg-osipchukv1.p.rapidapi.com/getAutocomplete" + countryid,
		// 	"method": "POST",
		// 	"headers": {
		// 		"x-rapidapi-host": "YelpAPIserg-osipchukV1.p.rapidapi.com",
		// 		"x-rapidapi-key": "de7f14a889msh47739a53de91d23p176494jsn5618424a7788",
		// 		"content-type": "application/x-www-form-urlencoded"
		// 	},
		// 	"data": {
		// 		"coordinate": "countryid",
		// 		"locale": "search",
		// 		"accessToken": "FVtUcdjPbjyM3FzTfJ6z6w8fRLyWucMi_1rFrNntVL7m15VCiZVGznGIIuRbbC0KPcnAwbuu6S2gKqFmaqf8u5tZvSew4DD-747alCICgvLc_FW81hOqTWrUiVgrXnYx",
		// 		"text": "search"
		// 	}
		// }

		// // $.ajax(settings).done(function (response) {
		// $.ajax(autocompleteSettings).done(function (response) {
		// 	console.log(response);
		// });

		// //Instagram tag api
		// var tagSettings = {
		// 	"async": true,
		// 	"crossDomain": true,
		// 	"url": "https://instagramdimashirokovv1.p.rapidapi.com/tag/travel/optional" + countryid,
		// 	"method": "GET",
		// 	"headers": {
		// 		"x-rapidapi-host": "InstagramdimashirokovV1.p.rapidapi.com",
		// 		"x-rapidapi-key": "de7f14a889msh47739a53de91d23p176494jsn5618424a7788"
		// 	}
		// }

		// // $.ajax(settings).done(function (response) {
		// $.ajax(tagSettings).done(function (response) {
		// 	console.log(response);

		// });	


		// SEARCH FUNCTION
		var inputTextValue = ("link-box").value;


		document.getElementById("search-button").onclick = function () {
			searchPlaces();
		}

		function searchPlaces() {

			for (i = 0; i < polygonSeries.length; i++); {

				if (inputTextValue === polygonSeries);
				chart.openPopup();
				$(".ampopup-header").hide();
			}

		}
		// Create hover state and set alternative fill color
		var hs = polygonTemplate.states.create("hover");
		hs.properties.fill = chart.colors.getIndex(0);


		// Add image series
		var imageSeries = chart.series.push(new am4maps.MapImageSeries());
		imageSeries.mapImages.template.propertyFields.longitude = "longitude";
		imageSeries.mapImages.template.propertyFields.latitude = "latitude";
		imageSeries.data = [{
			"title": "Brussels",
			"latitude": 50.8371,
			"longitude": 4.3676
		}, {
			"title": "Copenhagen",
			"latitude": 55.6763,
			"longitude": 12.5681
		}, {
			"title": "Paris",
			"latitude": 48.8567,
			"longitude": 2.3510
		}, {
			"title": "Reykjavik",
			"latitude": 64.1353,
			"longitude": -21.8952
		}, {
			"title": "Moscow",
			"latitude": 55.7558,
			"longitude": 37.6176
		}, {
			"title": "Madrid",
			"latitude": 40.4167,
			"longitude": -3.7033
		}, {
			"title": "London",
			"latitude": 51.5002,
			"longitude": -0.1262,
			"url": "http://www.google.co.uk"
		}, {
			"title": "Peking",
			"latitude": 39.9056,
			"longitude": 116.3958
		}, {
			"title": "New Delhi",
			"latitude": 28.6353,
			"longitude": 77.2250
		}, {
			"title": "Tokyo",
			"latitude": 35.6785,
			"longitude": 139.6823,
			"url": "http://www.google.co.jp"
		}, {
			"title": "Ankara",
			"latitude": 39.9439,
			"longitude": 32.8560
		}, {
			"title": "Buenos Aires",
			"latitude": -34.6118,
			"longitude": -58.4173
		}, {
			"title": "Brasilia",
			"latitude": -15.7801,
			"longitude": -47.9292
		}, {
			"title": "Ottawa",
			"latitude": 45.4235,
			"longitude": -75.6979
		}, {
			"title": "Washington",
			"latitude": 38.8921,
			"longitude": -77.0241
		}, {
			"title": "Kinshasa",
			"latitude": -4.3369,
			"longitude": 15.3271
		}, {
			"title": "Cairo",
			"latitude": 30.0571,
			"longitude": 31.2272
		}, {
			"title": "Pretoria",
			"latitude": -25.7463,
			"longitude": 28.1876
		}];

		// add events to recalculate map position when the map is moved or zoomed
		chart.events.on("ready", updateCustomMarkers);
		chart.events.on("mappositionchanged", updateCustomMarkers);

		// this function will take current images on the map and create HTML elements for them
		function updateCustomMarkers(event) {

			// go through all of the images
			imageSeries.mapImages.each(function (image) {
				// check if it has corresponding HTML element
				if (!image.dummyData || !image.dummyData.externalElement) {
					// create onex
					image.dummyData = {
						externalElement: createCustomMarker(image)
					};
				}

				// reposition the element accoridng to coordinates

				var xy = chart.geoPointToSVG({
					longitude: image.longitude,
					latitude: image.latitude
				});

				image.dummyData.externalElement.style.top = xy.y + 'px';
				image.dummyData.externalElement.style.left = xy.x + 'px';
			});

		}

		// this function creates and returns a new marker element
		function createCustomMarker(image) {


			var chart = image.dataItem.component.chart;

			// create holder
			var holder = document.createElement('div');
			holder.className = 'map-marker';
			holder.title = image.dataItem.dataContext.title;
			holder.style.position = 'absolute';

			// maybe add a link to it?
			if (undefined != image.url) {
				holder.onclick = function () {
					window.location.href = image.url;
				};
				holder.className += ' map-clickable';
			}

			// create dot
			var dot = document.createElement('div');
			dot.className = 'dot';
			holder.appendChild(dot);
			// create pulse
			var pulse = document.createElement('div');
			pulse.className = 'pulse';
			holder.appendChild(pulse);


			// append the marker to the map container
			chart.svgContainer.htmlElement.appendChild(holder);

			return holder;
		}


	}); // end am4core.ready()
}) // end document ready
