Template.transportation.helpers({

    units: function() {
        var units = Session.get("units");
        console.log(units);
        if (units === "miles") {
            return "Miles"
        } else if (units === "kilometers") {
            return "Kilometers"
        }
        return "Miles";
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

    "change #units": function() {
        var value = document.getElementById("units").value;
        if (value === "miles") {
            Session.set("units", value);
        } else if (value === "kilometers") {
            Session.set("units", value);
        }
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




