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
    },

    getMake: function() {
        //console.log(CarEfficiency.distinct("Make"));
    }
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

    //"click": function(){
    //    var records = CarbonStats.find({userID: Meteor.userId(), year:2015}).fetch();
    //    console.log(records[0].transportation.totalTransport);
    //    document.getElementById("totalTransportEmissions").innerHTML = records[0].transportation.totalTransport;
    //
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
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    },

    "change input": function() {
        updateTransport();
    },

    "change #carDistanceTraveledCheckbox": function() {
        if (document.getElementById("carDistanceTraveledCheckbox").checked) {
            $("#carDistanceCollapse").css("display","block");
        } else {
            $("#carDistanceCollapse").css("display","none");

        }
    },

    "change #fuelEfficiencyCheckbox": function() {
        if (document.getElementById("fuelEfficiencyCheckbox").checked) {
            $("#fuelEfficiencyCollapse").css("display","block");
        } else {
            $("#fuelEfficiencyCollapse").css("display","none");

        }
    },

    "click": function() {
        var distinctEntries = _.uniq(CarEfficiency.find({}, {
            sort: {make: 1}, fields: {make: true}
        }).fetch().map(function(x) {
            return x.make;
        }), true);
        console.log(distinctEntries);
        console.log(Meteor.call("test"));

        var treeRecord = CarEfficiency.find( {sort : ['make', 'dsc']}).fetch();
        console.log(treeRecord);
    }

});

Template.transportation.onCreated(function () {
    Session.set("units", "Miles");
});

Template.transportation.onRendered(function () {
    $('select').material_select();

    //$('.modal-trigger').leanModal();
    $('#modal1').openModal();

    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });


    $(document).ready(function(){
        $('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset().top });
    });
});

Template.transportation.onDestroyed(function () {
    //add your statement here
});

function toast() {
}



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

