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


    "click #species2": function() {
    alert("hello");
    /*    var make = document.getElementById("carMake").value.split(" : ")[1];
        var select = document.getElementById("carModel");
        var option;
        var temp = Cars.find({make: make}).fetch();

        document.getElementById("carYear").innerHTML = "<option disabled selected>Select a Year</option>";
        select.innerHTML = "<option disabled selected>Select a Model</option>";

        temp = temp[0].models;

        // Using " : " (space, colon, space) as a delimiter.
        temp.forEach(function(current, index) {
            option = document.createElement("option");
            option.value = index + " : " + current.model;
            option.text = current.model;
            select.add(option);
        })

        // NEED to call material_seelct() again to update <options>
        $('select').material_select();

    */
        var showData = [ {
            "draw_date" : "2015-01-17T00:00:00",
            "winning_numbers" : "15 16 23 27 36 09",
            "multiplier" : "2"
        }
            , {
                "draw_date" : "2015-01-14T00:00:00",
                "winning_numbers" : "02 04 10 41 53 22",
                "multiplier" : "5"
            }
            , {
                "draw_date" : "2015-01-10T00:00:00",
                "winning_numbers" : "02 09 19 28 29 19",
                "multiplier" : "5"
            }];

//set a default option to the select.
        var html = "<option value='' disabled default>Select a date</option>";

//iterate over each lottery drawing and add it to the select.
//The date will be displayed, the index of the array element will be the value.
        showData.forEach(function(element, index){
            var date = new Date(element.draw_date);
            html += "<option value='"+index+"'>"+ date.getDate() + "/" + (parseInt(date.getMonth())+1) + "/" + date.getFullYear()+ "</option>";

        });

//insert the option into the select.
        document.getElementById("selectDate").insertAdjacentHTML("beforeend", html);
//add an onchange event handler to the select.
        document.getElementById("selectDate").addEventListener("change", displayWinningNumbers, false);

        function displayWinningNumbers(e)
        {
            //when a option is selected, test the value. If 0 or higher return the array entry with the winning numbers.
            if(e.target.value >= 0)
            {
                alert(showData[e.target.value].winning_numbers);
            }
        }
    },
});

Template.plantTree.events({

    'dropped #dropzone': function(e) {
        console.log('dropped a file');
    },


    'click #test': function(event, template) {
        console.log('test');

        /*
        var treeDiameter = [];
        treeDiameter = TreeDiameter.find().fetch();//
        // TreeDiameter.find().fetch();
        console.log(treeDiameter);
        console.log(TreeDiameter.find().fetch());
        console.log(TreeCollection.find().fetch());
        */

        //$('#species1').html(treeRecord[treeRecord.length -1].species);
        var treeDiameter = [];
        treeDiameter = TreeDiameter.find().fetch();
        console.log(treeDiameter);

        $('#species1').html("Insert Species");
        $('#description1').html("Insert Description");
        $("#rightColumn").hide();
        $("#rightColumn2").show();

        console.log(treeDiameter[0].commonName);

    },

    'click #location': function(event, template) {

        $("#rightColumn2").hide();
        $("#rightColumn").show();

    },


    'click #cancel': function(event, template) {
        console.log('test');

        var treeDiameter = [];
        treeDiameter = TreeDiameter.find().fetch();//
        // TreeDiameter.find().fetch();
        console.log(treeDiameter);
        console.log(TreeDiameter.find().fetch());
        console.log(TreeCollection.find().fetch());


    },

    'click #save': function(event, template) {
        console.log('Saving a tree');
        var species = template.find("#species").value;
        var location = template.find("#location").value;
        var latitude = template.find("#latitude").value;
        var longitude = template.find("#longitude").value;
        var datePlanted = template.find("#datePlanted").value;
        var diameter = template.find("#diameter").value;
        var diameterUnits = template.find("#diameterUnits").value;
        var createdDate = new Date();

        var tree = {'userID':Meteor.userId(),
            'species':species,
            'location':location,
            'latitude':latitude,
            'longitude':longitude,
            'datePlanted':datePlanted,
            'diameter':diameter,
            'diameterUnits':diameterUnits,
            'createdDate':createdDate
        };
        if(species == "" || location == "" || latitude == "" || longitude == "" || datePlanted == "" ||
            diameter == "" || diameterUnits == "" || createdDate == "" ){
            window.alert("Please fill out all of the fields");
        }
        else{
            TreeCollection.insert(tree);

            var treeRecord;
            //fix this, sort isn't working properly.  I had to brute force find the last entry by doing length -1
            treeRecord = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
            console.log(treeRecord);

            $('#species1').html(treeRecord[treeRecord.length -1].species);
            $('#location1').html(treeRecord[treeRecord.length -1].location);
            $('#datePlanted1').html(treeRecord[treeRecord.length -1].datePlanted);
            //$('#diameter1').html(treeRecord[treeRecord.length -1].diameter);

            //<script>
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
            //</script>

            $("#info").show();
            $("#info2").show();
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