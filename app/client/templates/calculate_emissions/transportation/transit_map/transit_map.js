Template.transitMap.helpers({
    transitMapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(21.407751, -157.900071),
                zoom: 12
            };
        }
    },
    showRoutes: function() {
        var busRoutes = Session.get("busRoutes");
        return busRoutes;
    }
});

Template.transitMap.events({
    "click #transit-input-origin": function() {
        $("#transit-input-origin").select();
    },
    "click #transit-input-destination": function() {
        $("#transit-input-destination").select();
    },

    "change #transit-input-origin, change  #transit-input-destination": function() {
        console.log(document.getElementById('transit-input-origin').value);
        console.log(document.getElementById('transit-input-destination').value);


        if (document.getElementById('transit-input-origin').value !== "" && document.getElementById('transit-input-destination').value !== "") {
            console.log("THIS IS A TEST");
            console.log(document.getElementById('transit-input-origin').value);
            console.log(document.getElementById('transit-input-destination').value);
            //calculateAndDisplayRoute(directionsService, directionsDisplay);
        }
    },
    "click #add-route": function() {
        console.log("ONE");
        var transitBusRoutes;
        var busIndex = Session.get("busRouteIndex");
        var busRoute = {
            busIndex: busIndex,
            origin: document.getElementById("transit-input-origin"),
            destination: document.getElementById("transit-input-destination"),
            frequency: document.getElementById("transit-input-frequency"),
            distance: Session.get("currentRouteTotalDistance")
        };
        if (busIndex == 0) {
            transitBusRoutes = [];
        } else {
            transitBusRoutes = Session.get("busRoutes");
        }
        console.log(busRoute);
        transitBusRoutes.push(busRoute);
        console.log(transitBusRoutes);
        Session.set("busRoutes", transitBusRoutes);
        console.log("SAFE?");
        Session.set("busRouteIndex", busIndex + 1);
    }
    //"change #transit-input-origin, change #transit-input-destination": function() {
    //
    //}
});

Template.transitMap.onCreated(function () {
    init();
});

Template.transitMap.onRendered(function () {
    GoogleMaps.load({libraries: 'geometry,places'});
    $('.tooltipped').tooltip({delay: 50});
    Session.set("busRoutes",[]);
    Session.set("busRouteIndex", 0);

});

Template.transitMap.onDestroyed(function () {
    //add your statement here
});

function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('transitMap', function(map) {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var currentLocationInfoWindow = new google.maps.InfoWindow();

        var map = GoogleMaps.maps.transitMap.instance;
        //var infoWindow = new google.maps.InfoWindow({map: map});
        directionsDisplay.setMap(map);


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var currentLocationMarker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: {lat: position.coords.latitude, lng: position.coords.longitude},
                    icon: "http://i.stack.imgur.com/orZ4x.png"
                });
                map.setCenter(pos);

                currentLocationInfoWindow.close();
                currentLocationInfoWindow.setContent('<strong>' + 'Current Location' + '</strong>');
                currentLocationInfoWindow.open(map, currentLocationMarker);

            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        var inputOrigin = document.getElementById('transit-input-origin');
        var inputDestination = document.getElementById('transit-input-destination');
        var inputSubmit = document.getElementById('transit-submit');
        routeDistanceLabel = document.getElementById('route-distance-label');



        //var types = document.getElementById('type-selector');

        //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputOrigin);
        //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputDestination);
        //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputSubmit);
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
            currentLocationInfoWindow.close();

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
            currentLocationInfoWindow.close();

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
            if (document.getElementById('transit-input-origin').value !== "" && document.getElementById('transit-input-destination').value !== "") {
                console.log("INSIDE");
                infowindowOrigin.close();
                infowindowDestination.close();
                calculateAndDisplayRoute(directionsService, directionsDisplay);

            } else {
                console.log("OUTSIDE");
            }
            //console.log(document.getElementById('transit-input-origin').value);
            //console.log(document.getElementById('transit-input-destination').value);

        };
        //document.getElementById('transit-input-origin').addEventListener('change', onChangeHandler);
        //document.getElementById('transit-input-destination').addEventListener('change', onChangeHandler);
        document.getElementById('transit-submit').addEventListener('click', onChangeHandler);


    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var transitMode = google.maps.TransitMode.BUS;
    directionsService.route({
        origin: document.getElementById('transit-input-origin').value,
        destination: document.getElementById('transit-input-destination').value,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
            //arrivalTime: new Date(),
            //departureTime: new Date(),
            modes: [transitMode],
            //routingPreference: TransitRoutePreference
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        provideRouteAlternatives: true
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            //directionsDisplay.setDirections(response);
            //directionsDisplay.setRouteIndex(2);
            //console.log(response);
            //console.log(response.routes);
            //console.log(response.routes[0]);
            //console.log(response.routes[0].legs[0].distance);
            //console.log(calculateTotalRouteDistance(response.routes[0]));
            updateRouteDistanceLabel(response.routes[0]);

            directionsDisplay.setDirections(response);
            //
            //for (var i = 0, len = response.routes.length; i < len; i++) {
            //    //directionsDisplay.setDirections(response);
            //
            //    new google.maps.DirectionsRenderer({
            //        map: GoogleMaps.maps.transitMap.instance,
            //        directions: response,
            //        routeIndex: i
            //    });
            //}
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
    totalDistance = (totalDistance * unitConversion).toFixed(2);
    Session.set("currentRouteTotalDistance", totalDistance);
    return totalDistance;
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


