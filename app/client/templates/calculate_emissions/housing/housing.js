Template.housing.helpers({
    totalHousing: function() {
        return calculateHousing();
    }
});

Template.housing.events({
    "click #cancel": function() {
        var url = "/";
        window.location.replace(url);
    },
    //"click #next": function() {
    //    event.preventDefault();
    //    $("ul.tabs").tabs("select_tab", "food");
    //    $("html, body").animate({ scrollTop: 0 }, "slow");
    //    return false;
    //
    //}
    "submit": function() {
        console.log("SUBMIT");
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "food");
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    },

    "change input": function() {
        updateHousing();
    }
});

Template.housing.onCreated(function () {
    //add your statement here
});

Template.housing.onRendered(function () {
    $('select').material_select();
});

Template.housing.onDestroyed(function () {
    //add your statement here
});

function updateHousing() {
    var total = calculateHousing();
    document.getElementById("totalHousingEmissions").innerHTML = total.toFixed(2);
}


function calculateHousing() {
    var totalHousing = 0;

    var electricityUsed = (document.getElementById('electricityUsedUsed').value);
    var fuelUsed = (document.getElementById('fuelUsed').value);
    var gasUsed = (document.getElementById('gasUsed').value);
    var gasUnits = (document.getElementById('gasUnits').value);
    var waterUsed = (document.getElementById('waterUsed').value);


    if (gasUnits == 'cubicFeet') {
        var gasCarbon = gasUsed * 4317 * 1.14 * 0.000001;
        totalHousing = totalHousing + gasCarbon;
    } else if (gasUnits == 'btu') {
        var gasCarbon = gasUsed * 5470 * 1.14 * 0.000001;
        totalHousing = totalHousing + gasCarbon;
    } else {
        var gasCarbon = gasUsed * 547 * 1.14 * 0.000001;
        totalHousing = totalHousing + gasCarbon;
    }
    if (electricityUsed !== "") {
        var electricityCarbon = electricityUsed * 11789 * 1.09 * 0.000001;
        totalHousing = totalHousing + electricityCarbon;
    }
    if (fuelUsed !== "") {
        var fuelCarbon = fuelUsed * 682 * 0.000001;
        totalHousing = totalHousing + fuelCarbon;
    }

    if (waterUsed !== "") {
        var waterCarbon = waterUsed * 11707 * 0.000001;
        totalHousing = totalHousing + waterCarbon;
    }
    return totalHousing;
}
