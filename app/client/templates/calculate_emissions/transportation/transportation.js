Template.transportation.helpers({

    units: function() {
        var units = Session.get("units");
        //console.log(units);
        if (units === "miles") {
            return "Miles"
        } else if (units === "kilometers") {
            return "Kilometers"
        }
        return "Miles";
    },

    totalTransport: function() {
        return calculateTransport();
    }
});

Template.transportation.events({
    "click #cancel": function() {
        var url = "/";
        window.location.replace(url);
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
    "submit": function() {
        console.log("SUBMIT");
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "housing");
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    },

    "change input": function() {
        updateTransport();
    }
});

Template.transportation.onCreated(function () {
    Session.set("units", "Miles");
});

Template.transportation.onRendered(function () {
    $('select').material_select();
});

Template.transportation.onDestroyed(function () {
    //add your statement here
});

function updateTransport() {
    var total = calculateTransport();
    document.getElementById("totalTransportEmissions").innerHTML = total.toFixed(2);
}

function calculateTransport() {
    if(document.getElementById('carDistanceTraveled') !== null) {


        console.log("CALCULATE");
        var totalTransport = 0;
        var unitConversion = 1;

        var carDistanceTraveled = (document.getElementById('carDistanceTraveled').value);
        var fuelEfficiency = (document.getElementById('fuelEfficiency').value);
        var fuelType = (document.getElementById('fuelType').value);
        var trainDistanceTraveled = (document.getElementById('trainDistanceTraveled').value);
        var busDistanceTraveled = (document.getElementById('busDistanceTraveled').value);
        var planeDistanceTraveled = (document.getElementById('planeDistanceTraveled').value);
        var motorcycleDistanceTraveled = (document.getElementById('motorcycleDistanceTraveled').value);

        var units = (document.getElementById('units').value);

        if (units === 'miles') {
            unitConversion = 1;
        }
        else if (units === "kilometers") {
            unitConversion = 1.60934;
        }

        if (fuelType == 'diesel' && fuelEfficiency != "" && carDistanceTraveled != "") {

            var gallons = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 10153) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
            totalTransport = totalTransport + gallons;

        } else if (fuelType == 'gasoline' && fuelEfficiency != "" && carDistanceTraveled != "") {


            var gallons = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 8874) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
            totalTransport = totalTransport + gallons;
        }


        if (busDistanceTraveled !== "") {
            var busDistanceTraveled_total = (busDistanceTraveled * 300 * 1.26 * 0.000001) * unitConversion;
            totalTransport = totalTransport + busDistanceTraveled_total;
        }
        if (trainDistanceTraveled !== "") {
            var transit_total = (trainDistanceTraveled * 163 * 1.26 * 0.000001) * unitConversion;
            totalTransport = totalTransport + transit_total;
        }

        if (planeDistanceTraveled !== "") {

            var air_total = (planeDistanceTraveled * 223 * 2 * 0.000001) * unitConversion;
            totalTransport = totalTransport + air_total;
        }
        return totalTransport;
    }

}

