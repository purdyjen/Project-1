$(document).ready(function(){


//Yelp API
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://yelpapiserg-osipchukv1.p.rapidapi.com/getAutocomplete",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "YelpAPIserg-osipchukV1.p.rapidapi.com",
		"x-rapidapi-key": "67e5b82144msh17b9c9ba44c04e7p1ef9f8jsn8f0e1f2fd82a",
		"content-type": "application/x-www-form-urlencoded"
	},
	"data": {}
}

$.ajax(settings).done(function (response) {
	console.log(response);
}); //yelp closing tag

//imgur API
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://imgur-apiv3.p.rapidapi.com/3/gallery/%7Bsection%7D/%7Bsort%7D/%7Bwindow%7D/%7Bpage%7D",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imgur-apiv3.p.rapidapi.com",
		"x-rapidapi-key": "67e5b82144msh17b9c9ba44c04e7p1ef9f8jsn8f0e1f2fd82a"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
}); //imgur closing tag

//GeoDB Cities API
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://wft-geo-db.p.rapidapi.com/v1/locale/locales",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
		"x-rapidapi-key": "67e5b82144msh17b9c9ba44c04e7p1ef9f8jsn8f0e1f2fd82a"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
}); //GeoDB Cities closing tag

}); //doc ready closing tag