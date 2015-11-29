Template.transportation.helpers({
    units: function() {
        return getUnits();
    }
});

Template.transportation.events({
    "click #cancel": function() {
        var url = "/";
        window.location.replace(url);
    },
    "click #next": function() {
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "housing");
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    },

    "click #units": function() {
        var value = document.getElementById("units");
        setUnits(value.options[value.selectedIndex].value);

        console.log(value.options[value.selectedIndex].value);
    }
});

Template.transportation.onCreated(function () {
    //add your statement here
});

Template.transportation.onRendered(function () {
    $('select').material_select();
});

Template.transportation.onDestroyed(function () {
    //add your statement here
});

var units = "miles";

function setUnits(value) {
    if (value === "miles" || value === "kilometers") {
        units = value;
    }
}
function getUnits() {
   return units;
}
