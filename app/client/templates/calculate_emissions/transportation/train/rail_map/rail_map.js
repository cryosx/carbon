Template.railMap.helpers({
    railMapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(21.407751, -157.900071),
                zoom: 12
            };
        }
    }
});

Template.railMap.events({
    "click #pac-input-origin": function() {
        $("#pac-input-origin").select();
    },
    "click #pac-input-destination": function() {
        $("#pac-input-destination").select();
    },
    //"change #pac-input-origin, change #pac-input-destination": function() {
    //
    //}
});

Template.railMap.onCreated(function () {
    init();
});

Template.railMap.onRendered(function () {
    GoogleMaps.load({libraries: 'geometry,places'});
});

Template.railMap.onDestroyed(function () {
    //add your statement here
});

function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('railMap', function(map) {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var map = GoogleMaps.maps.railMap.instance;
        //var infoWindow = new google.maps.InfoWindow({map: map});
        directionsDisplay.setMap(map);


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                marker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: {lat: position.coords.latitude, lng: position.coords.longitude},
                    icon: "http://i.stack.imgur.com/orZ4x.png"
                });
                map.setCenter(pos);

            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        var inputOrigin = document.getElementById('pac-input-origin');
        var inputDestination = document.getElementById('pac-input-destination');
        var inputSubmit = document.getElementById('pac-submit');
        routeDistanceLabel = document.getElementById('route-distance-label');



        //var types = document.getElementById('type-selector');

        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputOrigin);
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputDestination);
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputSubmit);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(routeDistanceLabel);


        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
        autocompleteOrigin.bindTo('bounds', map);

        var infowindowOrigin = new google.maps.InfoWindow();
        var markerOrigin = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocompleteOrigin.addListener('place_changed', function() {
            infowindowOrigin.close();
            markerOrigin.setVisible(false);
            var place = autocompleteOrigin.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(8);  // Why 17? Because it looks good.
            }
            markerOrigin.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            markerOrigin.setPosition(place.geometry.location);
            markerOrigin.setVisible(true);
            markerOrigin.setDraggable(false);
            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            inputOrigin.value = address;

            infowindowOrigin.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindowOrigin.open(map, markerOrigin);
        });

        var autocompleteDestination = new google.maps.places.Autocomplete(inputDestination);
        autocompleteDestination.bindTo('bounds', map);

        var infowindowDestination = new google.maps.InfoWindow();
        var markerDestination = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocompleteDestination.addListener('place_changed', function() {
            infowindowDestination.close();
            markerDestination.setVisible(false);
            var place = autocompleteDestination.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(8);  // Why 17? Because it looks good.
            }
            markerDestination.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            markerDestination.setPosition(place.geometry.location);
            markerDestination.setVisible(true);
            markerDestination.setDraggable(false);
            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }


            infowindowDestination.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindowDestination.open(map, markerDestination);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        //function setupClickListener(id, types) {
        //    var radioButton = document.getElementById(id);
        //    radioButton.addEventListener('click', function() {
        //        autocomplete.setTypes(types);
        //    });
        //}
        //
        //setupClickListener('changetype-all', []);
        //setupClickListener('changetype-address', ['address']);
        //setupClickListener('changetype-establishment', ['establishment']);
        //setupClickListener('changetype-geocode', ['geocode']);

        var onChangeHandler = function() {
            if (document.getElementById('pac-input-origin').value !== "" && document.getElementById('pac-input-destination').value !== "") {
                console.log("INSIDE");
                calculateAndDisplayRoute(directionsService, directionsDisplay);

            } else {
                console.log("OUTSIDE");
            }
            console.log(document.getElementById('pac-input-origin').value);
            console.log(document.getElementById('pac-input-destination').value);

        };
        //document.getElementById('pac-input-origin').addEventListener('change', onChangeHandler);
        //document.getElementById('pac-input-destination').addEventListener('change', onChangeHandler);
        document.getElementById('pac-submit').addEventListener('click', onChangeHandler);


    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('pac-input-origin').value,
        destination: document.getElementById('pac-input-destination').value,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
            //arrivalTime: new Date(),
            departureTime: new Date(),
            modes: [google.maps.TransitMode.BUS],
            //routingPreference: TransitRoutePreference
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        provideRouteAlternatives: true
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            //directionsDisplay.setDirections(response);
            //directionsDisplay.setRouteIndex(2);
            console.log(response);
            console.log(response.routes);
            console.log(response.routes[0]);
            console.log(response.routes[0].legs[0].distance);
            console.log(calculateTotalRouteDistance(response.routes[0]));
            updateRouteDistanceLabel(response.routes[0]);

            for (var i = 0, len = response.routes.length; i < len; i++) {
                //directionsDisplay.setDirections(response);

                new google.maps.DirectionsRenderer({
                    map: GoogleMaps.maps.railMap.instance,
                    directions: response,
                    routeIndex: i
                });
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function updateRouteDistanceLabel(route) {
    var textLabel;
    textLabel = calculateTotalRouteDistance(route);
    var units = (document.getElementById('units').value)

    if (units === 'miles') {
        textLabel += " mi";
    }
    else if (units === "kilometers") {
        textLabel += " km";
    }
    routeDistanceLabel.innerText = textLabel;
}

function calculateTotalRouteDistance(route) {
    var totalDistance = 0;
    for (var i = 0; i < route.legs.length; i++) {
        totalDistance += route.legs[i].distance.value;
    }
    var units = (document.getElementById('units').value)
    var unitConversion = 1;

    // Google maps returns distance in meters, must convert that to miles or kilometers
    if (units === 'miles') {
        unitConversion = 100 / 2.54 / 12 / 5280;
    }
    else if (units === "kilometers") {
        unitConversion = 0.001;
    }
    return (totalDistance * unitConversion).toFixed(2);
}


function alertCoords(){
    console.log("Marker: " + marker.getPosition().lat());
}

function setMarker() {
    var lat = parseFloat($("#latitude").val());
    var lng = parseFloat($("#longitude").val());
    console.log("Lat: " + lat);
    console.log("Lng: " + lng);

    if (!isNaN(lat) || !isNaN(lng)) {
        if (lat > -90 && lat < 90 && lng > -180 && lat < 90) {
            marker.setPosition({lat: lat, lng: lng});
            marker.getMap().setCenter({lat: lat, lng: lng});
        }

    }
}

function updateLatLng() {
    $("#latitude").val(marker.getPosition().lat());
    $("#longitude").val(marker.getPosition().lng());
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


