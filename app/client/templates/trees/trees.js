Template.trees.helpers({

    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(21.3500, -157.8000),
                zoom: 12
            };
        }
    }
});

Template.trees.events({

    'click #save': function(event, template) {
        console.log('Saving a tree');
        var species=template.find("#species").value;
        var location=template.find("#location").value;
        var latitude=template.find("#latitude").value;
        var longitude=template.find("#longitude").value;
        var datePlanted=template.find("#datePlanted").value;
        var diameter=template.find("#diameter").value;
        //var createdDate=newDate();
        var tree={'userID':Meteor.user()._id,
            'species':species,
            'location':location,
            'latitude':latitude,
            'longitude':longitude,
            'datePlanted':datePlanted,
            'diameter':diameter,
            //'created':createdDate
        };
        //tree['userID']=Meteor.user()._id; //or tree.key=value
        console.log(tree);
        console.log(Meteor.user()._id);

        TreeCollection.insert(tree);

        var treeID;

    },
    "click": function() {
        alertCoords();
    }
});


Template.trees.onCreated(function () {
   init();
});

Template.trees.onRendered(function () {
    GoogleMaps.load();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
});

Template.trees.onDestroyed(function () {
    //add your statement here
});
function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', toggleBounce);
        marker.addListener('drag', updateLatLng);

    });
}


function alertCoords(){
    console.log("Marker: " + marker.getPosition().lat());
}

function updateLatLng() {
    document.getElementById("latitude");
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