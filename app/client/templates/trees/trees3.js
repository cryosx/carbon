
var treeArray;
var treeRecord;

Template.trees3.helpers({


    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(21.3500, -157.8000),
                zoom: 12
            };
        }
    },
    specificFormData: function() {
        return {
            id: this._id,
            other: this.other,
            hard: 'Lolcats'
        }
    },
    myCallbacks: function() {
        return {
            formData: function () {
                return {id: "232323", other: Session.get("ReactiveParam")}
            },
            finished: function (index, fileInfo, context) {
            },
        }
    },
});

var owl = $("#tree-carousel");
var string = "'click #tree1':function(event,template){console.log(hello);}";
console.log(string);

Template.trees3.events({

    /*string:function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[0];
        console.log(treeRecord);
        setMarker();
    },*/
    /*'click #tree1':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[0];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree2':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[1];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree3':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[2];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree4':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[3];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree5':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[4];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree6':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[5];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree7':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[6];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree8':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[7];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree9':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[8];
        console.log(treeRecord);
        setMarker();
    },
    'click #tree10':function(event,template){
        treeArray = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeRecord = treeArray[9];
        console.log(treeRecord);
        setMarker();
    },
    */
    "change #latitude, change #longitude": function() {
        setMarker();
    },

});

Template.trees3.onCreated(function () {
    init();
});

Template.trees3.onRendered(function () {


    $('select').material_select();
    GoogleMaps.load();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });


    var owl = $(".owl-carousel").owlCarousel({

        autoPlay: 5000, //Set AutoPlay to 3 seconds
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

    $(".next").click(function(){
        owl.trigger('owl.next');
    });
    $(".prev").click(function(){
        owl.trigger('owl.prev');
    });
    $(".play").click(function(){
        owl.trigger('owl.play',5000); //owl.play event accept autoPlay speed as second parameter
    });
    $(".stop").click(function(){
        owl.trigger('owl.stop');
    });
    $("body").keydown(function(e) {
        if(e.keyCode == 37) {
            // left
            owl.trigger('owl.prev');

        }
        else if(e.keyCode == 39) {
            // right
            owl.trigger('owl.next');
        }
    });
    $('.materialboxed').materialbox();

    $(".add").ready(function(){
        /*
        var treeRecords = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();

        for(var i = 0; i < treeRecords.length; i++) {
            var content = "<div id=\"tree" + (i+1) + "\" class=\"item\"><img src=\"/parallax/tree" + (i+1) +".jpg\" alt=\"/parallax/treeSample.jpg\"></div>";

            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = content;
            document.getElementById("tree-carousel").appendChild(htmlObject);
        }

        document.querySelector('body').addEventListener('click', function(event) {
            if ( event.target.id=== 'tree1'){
                alert(event.target.id);
            }
        });
        */

    });

});

Template.trees3.onDestroyed(function () {
    //add your statement here
});

/*function myFunction(){
    var trees = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
    var treeCount = 0;
    var i = 0;
    do{
        treeCount++;
        i++;
        console.log(treeCount);
    }while(trees[i] != null);

    //for(var j=1; j<=treeCount; j++){
        //$('#testDiv').insertAfter('<div id="tree' + j + '"></div>');
        $('#tree-carousel').insertAfter('<div id = "tree1" class="item"><img src="/parallax/babyTree.jpg" alt="/parallax/treeSample.jpg"></div>');
    //}
}*/

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

function setMarker() {
    var lat = parseFloat(treeRecord.latitude);
    var lng = parseFloat(treeRecord.longitude);

    //var lat = parseFloat($("#latitude").val());
    //var lng = parseFloat($("#longitude").val());
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



    //$("#latitude").val(marker.getPosition().lat());
    //$("#longitude").val(marker.getPosition().lng());
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