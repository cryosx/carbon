var imageID = "";

Template.plantTree.helpers({
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

Template.plantTree.events({

    'click #test': function(event, template) {
        console.log('test');

        var trees = [];
        var pics = [];

        //correct sort function listed below
        trees = TreeCollection.find({userID: Meteor.userId()}, {sort : {createdDate: -1}}).fetch();

        var pictureID = trees[0].imageID;
        pics = Images.find({_id: pictureID}).fetch();
        console.log(pics);

        $("#rightColumn").show();
        $("#rightColumn2").hide();

        console.log(treeDiameter[0].commonName);

    },

    'click #location': function(event, template) {

        $("#rightColumn2").hide();
        $("#rightColumn").show();

    },

    'click #latitude': function(event, template) {

        $("#rightColumn2").hide();
        $("#rightColumn").show();

    },

    'click #longitude': function(event, template) {

        $("#rightColumn2").hide();
        $("#rightColumn").show();

    },


    'click #cancel': function(event, template) {
        console.log('test');

    },

    'click #save': function(event, template) {
        console.log('Saving a tree');
        var species = template.find("#species").value;
        console.log(species);
        var location = template.find("#location").value;
        var latitude = template.find("#latitude").value;
        var longitude = template.find("#longitude").value;
        var datePlanted = template.find("#datePlanted").value;
        var diameter = template.find("#diameter").value;
        console.log(diameter);
        // Centimeters assumed because of current TreeDiameter Database 2/29/16
        var diameterUnits = "Centimeters"; //template.find("#diameterUnits").value;
        var createdDate = new Date();

        var tree = {'userID':Meteor.userId(),
            'species':species,
            'location':location,
            'latitude':latitude,
            'longitude':longitude,
            'datePlanted':datePlanted,
            'diameter':diameter,
            'diameterUnits':diameterUnits,
            'createdDate':createdDate,
            'imageID':imageID,
        };
        if(species == "" || location == "" || latitude == "" || longitude == "" || datePlanted == "" ||
            diameter == "" || diameterUnits == "" || createdDate == "" ){
            window.alert("Please fill out all of the fields");
        }
        else{
            console.log(tree);
            TreeCollection.insert(tree);

            /* DONE IN autoComplete.js NOW!!

            var treeRecord;
            //fix this, sort isn't working properly.  I had to brute force find the last entry by doing length -1
            treeRecord = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
            console.log(treeRecord);

            $('#species1').html(treeRecord[treeRecord.length -1].species);
            $('#location1').html(treeRecord[treeRecord.length -1].location);
            $('#datePlanted1').html(treeRecord[treeRecord.length -1].datePlanted);
            //$('#diameter1').html(treeRecord[treeRecord.length -1].diameter);

            function myFunction() {
                var AccumulatedCO2=0;

                //Sy's edits
                var treeRecord = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
                var TreeDiameter = treeRecord[treeRecord.length -1].diameter;
                //var TreeDiameter = document.getElementById("TreeDiameter").value;

                //end edits
                var Results=[];
                var CO2 = "";
                var d = new Date();
                var YearPlanted = d.getFullYear();
                var YearOfCalculation = d.getFullYear();

                //--start--adjust for the units of the tree diameter selected by the user
                //var UnitSelected=document.getElementById('Units').options[document.getElementById('Units').selectedIndex].value;
                var UnitSelected = treeRecord[treeRecord.length -1].diameterUnits;

                //inches = 1
                //cm = 2
                if (UnitSelected == 1) {
                    var TreeDiameter=TreeDiameter/0.393701;
                } else {
                    var TreeDiameter=TreeDiameter;
                }
                //--end--adjust for the units of the tree diameter selected by the user


                for (i = 0; i <=85; i++) {
                    YearOfCalculation = i + 2015;
                    if (YearOfCalculation>=YearPlanted) {

                        //Body mass (kg dry above groung matter) from Chave et al (2001):
                        BodyMass =0.0998*(Math.pow(TreeDiameter,2.5445));

                        //Growth Rate (kg dry above groung matter/ plant /yr) from Niklas & Enquist (2001):
                        GrowthRate=0.208 *(Math.pow(BodyMass,0.763));

                        //dK/dy Above ground, this is the rate of production at each year assuming log decline:
                        dKdY=(Math.exp(1-(((GrowthRate*Math.exp(1))*(YearOfCalculation-YearPlanted))/BodyMass))/Math.exp(1))*(GrowthRate*Math.exp(1));

                        //Adding Below ground Using Cairns et al (1997) factor of 24% of above ground biomass:
                        dKdYT=dKdY*1.24;

                        //Carbon content Using Kirby & Potvin (2007) factor of 47% of total dry weight:
                        Carbon=dKdYT*0.47;

                        //CO2 sequestration.Conversion of Carbon in treee to CO2:
                        CO2=Carbon*3.6663;

                        //adds CO2 over the years:
                        AccumulatedCO2=AccumulatedCO2+CO2;

                        //Generates data.frame that includes year:
                        Results[i]= Math.round(AccumulatedCO2*10)/10 ;

                    } else {
                        Results[i]= 0 ;
                    }

                }


                document.getElementById("demo").innerHTML = "This tree will sequester " + parseInt(AccumulatedCO2)  + " Kg of CO2 over its life time";


                setTimeout(function(){

                    // generates a variable with the data to be plotted in the x-y chart
                    var Results1=Results;


                    $('#container').highcharts({

                        chart: {type: 'scatter',zoomType: 'x'},
                        title: {text: 'Projected CO2 stored by this tree'},
                        tooltip: {headerFormat: '<b></b>',pointFormat: "It will sequester {point.y}kg by {point.x:%Y}",hideDelay: 1},
                        xAxis: {type: 'datetime',title: {text: 'Year'}},
                        yAxis: {title: {text: 'CO2 sequestered (kg)'},min: 0},
                        legend: {enabled: false},
                        plotOptions:
                        {
                            area: {
                                fillColor:
                                {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                    stops: [[0, Highcharts.getOptions().colors[0]],[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity    (0).get('rgba')]]
                                },
                                marker: {radius: 2},
                                lineWidth: 1,
                                states: {hover: {lineWidth: 1}},
                                threshold: null
                            }
                        },

                        series: [{
                            type: 'area',
                            name: 'Cummulative CO2 stored',
                            pointInterval: 365 * 24 * 3600000,
                            pointStart: Date.UTC(2015, 0, 1),
                            data:Results1
                        }]
                    });

                }, 1);

            }
            window.onload = myFunction();

            $("#info").show();
            $("#info2").show();
            */
        }

    },
    "change #latitude, change #longitude": function() {
        setMarker();
    }
});




Template.plantTree.onCreated(function () {
    init();
});

Template.plantTree.onRendered(function () {

    $("#info").hide();
    $("#info2").hide();
    $("#rightColumn2").hide();

    $('select').material_select();
    GoogleMaps.load();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    //maybe this is the problem
    //if (Meteor.isClient){


        Dropzone.autoDiscover = false;

        // Adds file uploading and adds the imageID of the file uploaded
        // to the arrayOfImageIds object.

        var dropzone = new Dropzone("form#dropzone", {
            accept: function(file, done){

                Images.insert(file, function(err, fileObj){
                    if(err){
                        alert("Error");
                    } else {
                        // gets the ID of the image that was uploaded
                        imageID = fileObj._id;
                        console.log(imageID);
                    };
                });
            }
        });
    //};
});

Template.plantTree.onDestroyed(function () {
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