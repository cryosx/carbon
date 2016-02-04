Template.transportation.helpers({

    units: function() {
        var units = Session.get("units");
        if (units === "miles") {
            return "Miles"
        } else if (units === "kilometers") {
            return "Kilometers"
        }
        return "Miles";
    },

    totalTransport: function() {
        return calculateTransport();
    },
});



Template.transportation.events({
    "click #cancel": function() {
        Router.go("/");
    },
    //"click #next": function() {
    //    event.preventDefault();
    //    $("ul.tabs").tabs("select_tab", "housing");
    //    $("html, body").animate({ scrollTop: 0 }, "slow");
    //    return false;
    //},

    "change #units": function() {
        var value = document.getElementById("units").value;
        if (value === "miles") {
            Session.set("units", value);
        } else if (value === "kilometers") {
            Session.set("units", value);
        }
    },

    "change #carMileageLastCheck, change #carDateLastCheck, change #carCurrentMileage, change #carCurrentDate": function() {
        var carDistanceTraveled = document.getElementById("carDistanceTraveled");
        var carMileageLastCheck = document.getElementById("carMileageLastCheck").value;
        var carCurrentMileage = document.getElementById("carCurrentMileage").value;
        var carDateLastCheck = new Date(document.getElementById("carDateLastCheck").value);
        var carCurrentDate = new Date(document.getElementById("carCurrentDate").value);
        carDistanceTraveled.value = ((carCurrentMileage - carMileageLastCheck) / (Math.floor((carCurrentDate - carDateLastCheck) / (1000*60*60*24)))) * 365;
    },

    "change #carMake": function() {

        // POPULATE <options> for <select id="carModel">


        var make = document.getElementById("carMake").value.split(" : ")[1];
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

    },

    "change #carModel": function() {

        // POPULATE <options> for <select id="carYear">

        var make = document.getElementById("carMake").value.split(" : ")[1];
        var modelIndex = document.getElementById("carModel").value.split(" : ")[0];
        var select = document.getElementById("carYear");

        var option;
        var temp = Cars.find({make: make}).fetch();
        select.innerHTML = "<option disabled selected>Select a Year</option>";
        temp = temp[0].models[modelIndex].years;
        //for (var i = 0; i < temp.length; i++) {
        //    if (model === temp[i].model.toString()) {
        //        temp = temp[i].years;
        //        break;
        //    }
        //}
        temp.forEach(function(current, index) {
            option = document.createElement("option");
            option.value = index + " : " + current.year;
            option.text = current.year;
            select.add(option);
        })

        // NEED to call material_seelct() again to update <options>
        $('select').material_select();
    },

    "change #carYear": function() {
        var fuelEfficiency = document.getElementById("fuelEfficiency");
        var make = document.getElementById("carMake").value.split(" : ")[1];
        var modelIndex = document.getElementById("carModel").value.split(" : ")[0];
        var yearIndex = document.getElementById("carYear").value.split(" : ")[0];
        var temp = Cars.find({make: make}).fetch();
        temp = temp[0].models[modelIndex].years[yearIndex];
        if (document.getElementById("units").value === "miles") {
            fuelEfficiency.value = temp.MPG;
        } else if (document.getElementById("units").value === "kilometers") {
            fuelEfficiency.value = temp.KPG;
        }

    },

    "submit": function() {
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "housing");
        $("html, body").animate({ scrollTop: 0 }, "fast");
    },

    "change input": function() {
        updateTransport();
    },

    "change #carDistanceTraveledCheckbox": function() {
        $("#carDistanceCollapse").slideToggle(500);

    },

    "change #fuelEfficiencyCheckbox": function() {

        // POPULATE the <options> for <select id="carMake">

        // NEED to call material_seelct('destory) to update <options> along with material_select() at the bottom

        $('select').material_select('destroy');

        var cars = Cars.find().fetch();
        var select = document.getElementById("carMake");
        var option;

        document.getElementById("carModel").innerHTML = "<option disabled selected>Select a Model</option>";
        document.getElementById("carYear").innerHTML = "<option disabled selected>Select a Year</option>";

        select.innerHTML = "<option disabled selected>Select a Make</option>";


        // Using " : " (space, colon, space) as a delimiter.
        cars.forEach(function(current, index) {
            option = document.createElement("option");
            option.value = index + " : " + current.make;
            option.text = current.make;
            select.add(option);
        });

        // NEED to call material_seelct() again to update <options>

        $('select').material_select();

        // HIDE and show car selection for fuel efficiency

        $("#fuelEfficiencyCollapse").slideToggle(500);

    },

    "change #motorcycleCheckbox": function() {
        $("#motorcycleDistanceCollapse").slideToggle(500);
    },

    "change #motorcycleMileageLastCheck, change #motorcycleDateLastCheck, change #motorcycleCurrentMileage, change #motorcycleCurrentDate": function() {
        var motorcycleDistanceTraveled = document.getElementById("motorcycleDistanceTraveled");
        var motorcycleMileageLastCheck = document.getElementById("motorcycleMileageLastCheck").value;
        var motorcycleCurrentMileage = document.getElementById("motorcycleCurrentMileage").value;
        var motorcycleDateLastCheck = new Date(document.getElementById("motorcycleDateLastCheck").value);
        var motorcycleCurrentDate = new Date(document.getElementById("motorcycleCurrentDate").value);
        motorcycleDistanceTraveled.value = ((motorcycleCurrentMileage - motorcycleMileageLastCheck) / (Math.floor((motorcycleCurrentDate - motorcycleDateLastCheck) / (1000*60*60*24)))) * 365;
    },

    "change #railDistanceTraveledCheckbox": function() {
        $("#railDistanceCollapse").slideToggle(500);
    },

    "change #railMapCheckbox": function() {
        $("#railMapCollapse").slideToggle(500);
        google.maps.event.trigger(GoogleMaps.maps.railMap.instance, 'resize');
        //google.maps.event.trigger(GoogleMaps.maps.railMap.instance, 'center');

    },

    "click": function() {

    }
});

Template.transportation.onCreated(function () {
    Session.set("units", "Miles");

});

Template.transportation.onRendered(function () {

    $('ul.tabs').tabs();
    $('select').material_select();
    //$('.modal-trigger').leanModal();
    $('#modal1').openModal();
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset().top });

});

Template.transportation.onDestroyed(function () {
    //add your statement here
});


function updateTransport() {
    var totalTransport = calculateTransport();
    document.getElementById("totalTransportEmissions").innerHTML = totalTransport.toFixed(2);
    var value = "Total: " + totalTransport.toFixed(2);
    //Materialize.toast(value, 3000);
}

function calculateTransport() {
    if(document.getElementById('carDistanceTraveled') !== null) {

        var totalTransport = 0;
        var unitConversion = 1;

        var carDistanceTraveled = (document.getElementById('carDistanceTraveled').value);
        var fuelEfficiency = (document.getElementById('fuelEfficiency').value);
        var fuelType = (document.getElementById('fuelType').value);
        var railDistanceTraveled = (document.getElementById('railDistanceTraveled').value);
        var busDistanceTraveled = (document.getElementById('busDistanceTraveled').value);
        var airDistanceTraveled = (document.getElementById('airDistanceTraveled').value);

        var units = (document.getElementById('units').value);

        if (units === 'miles') {
            unitConversion = 1;
        }
        else if (units === "kilometers") {
            unitConversion = 1.60934;
        }

        if (fuelType === 'diesel' && fuelEfficiency !== "" && carDistanceTraveled !== "") {
            var carCarbon = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 10153) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
            totalTransport = totalTransport + carCarbon;
        } else if (fuelType === 'gasoline' && fuelEfficiency !== "" && carDistanceTraveled !== "") {

            var carCarbon = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 8874) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
            totalTransport = totalTransport + carCarbon;
        }

        if (busDistanceTraveled !== "") {
            var busCarbon = (busDistanceTraveled * 300 * 1.26 * 0.000001) * unitConversion;
            totalTransport = totalTransport + busCarbon;
        }
        if (railDistanceTraveled !== "") {
            var railCarbon = (railDistanceTraveled * 163 * 1.26 * 0.000001) * unitConversion;
            totalTransport = totalTransport + railCarbon;
        }
        if (airDistanceTraveled !== "") {

            var airCarbon = (airDistanceTraveled * 223 * 2 * 0.000001) * unitConversion;
            totalTransport = totalTransport + airCarbon;
        }
        return totalTransport;
    }

}

