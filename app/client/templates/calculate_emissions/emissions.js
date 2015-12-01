Template.emissions.helpers({

});

Template.emissions.events({

});

Template.emissions.onCreated(function () {

});

Template.emissions.onRendered(function () {
    var records = CarbonStats.find({userID: Meteor.userId(), year:2015}).fetch();
    if (records.length > 0) {
        //SET INPUT VALUES
        var currentYear = records[0];
        //PROCESS TRANSPORTATION
        var transportation = currentYear.transportation;
        document.getElementById("units")
        $("#units").val(transportation.units);
    }
});

Template.emissions.onDestroyed(function () {

});





function common_goods() {

    var totalgoods = 0;

    var cloth = (document.getElementById('cloth1').value);
    var furniture = (document.getElementById('furniture1').value);
    var health_care = (document.getElementById('health_care1').value);
    var vehicle = (document.getElementById('vehicle1').value);
    var house_maintance = (document.getElementById('house_maintance1').value);


    if (cloth !== "") {
        var cloth_total = cloth * 750 * 12 * 0.000001;
        $('#cloth').val(cloth_total.toFixed(2));
        totalgoods = totalgoods + cloth_total;
        $('#total_goods').val(totalgoods.toFixed(2));
        //alert(totalcal);
        document.getElementById("goods").innerHTML = totalgoods.toFixed(2);
    }

    if (furniture !== "") {
        var furniture_total = furniture * 614 * 12 * 0.000001;
        $('#furniture').val(furniture_total.toFixed(2));
        totalgoods = totalgoods + furniture_total;
        $('#total_goods').val(totalgoods.toFixed(2));
        //alert(totalcal);
        document.getElementById("goods").innerHTML = totalgoods.toFixed(2);
    }

    if (health_care !== "") {
        var health_care_total = health_care * 1151 * 12 * 0.000001;
        $('#health_care').val(health_care_total.toFixed(2));
        totalgoods = totalgoods + health_care_total;
        $('#total_goods').val(totalgoods.toFixed(2));
        //alert(totalcal);
        document.getElementById("goods").innerHTML = totalgoods.toFixed(2);
    }

    if (vehicle !== "") {
        var vehicle_total = vehicle * 433 * 12 * 0.000001;
        $('#vehicle').val(vehicle_total.toFixed(2));
        totalgoods = totalgoods + vehicle_total;
        $('#total_goods').val(totalgoods.toFixed(2));
        //alert(totalcal);
        document.getElementById("goods").innerHTML = totalgoods.toFixed(2);
    }

    if (house_maintance !== "") {
        var house_maintance_total = house_maintance * 134 * 12 * 0.000001;
        $('#house_maintance').val(house_maintance_total.toFixed(2));
        totalgoods = totalgoods + house_maintance_total;
        //alert(totalcal);
        document.getElementById("goods").innerHTML = totalgoods.toFixed(2);
        $('#total_goods').val(totalgoods.toFixed(2));


    }
    document.getElementById("goods").innerHTML = totalgoods.toFixed(2);
    $('#disgoods').hide();
    $('#andigoods').show();


}
$(document).ready(function () {
    $('.miles').tooltip({title: "miles per gallons", placement: "top"});

});

$(document).ready(function () {
    $('.miles').tooltip({title: "miles per gallons", placement: "top"});

});

$(document).ready(function () {
    $('.busDistanceTraveled').tooltip({title: "busDistanceTraveled", placement: "top"});

});
$(document).ready(function () {
    $('.commuter').tooltip({title: "commuter rail", placement: "top"});

});

$(document).ready(function () {
    $('.inter').tooltip({title: "inter city rail", placement: "top"});

});
$(document).ready(function () {
    $('.trainDistanceTraveled').tooltip({title: "trainDistanceTraveled rail", placement: "top"});

});
$(document).ready(function () {
    $('.flown').tooltip({title: "air travel", placement: "top"});

});
$(document).ready(function () {
    $('.electricity').tooltip({title: "electricity", placement: "top"});

});
$(document).ready(function () {
    $('.gas').tooltip({title: "gas", placement: "top"});

});
$(document).ready(function () {
    $('.fuels').tooltip({title: "fuels", placement: "top"});

});
$(document).ready(function () {
    $('.water_used').tooltip({title: "water_used", placement: "top"});

});


$(document).ready(function () {
    $('.beef').tooltip({title: "beef", placement: "top"});

});
$(document).ready(function () {
    $('.poultry').tooltip({title: "poultry", placement: "top"});

});
$(document).ready(function () {
    $('.fish').tooltip({title: "fish", placement: "top"});

});
$(document).ready(function () {
    $('.dairy').tooltip({title: "dairy", placement: "top"});

});
$(document).ready(function () {
    $('.vegetables').tooltip({title: "vegetables", placement: "top"});

});
$(document).ready(function () {
    $('.bakery').tooltip({title: "bakery", placement: "top"});

});
$(document).ready(function () {
    $('.drinks').tooltip({title: "drinks", placement: "top"});

});
$(document).ready(function () {
    $('.cloth').tooltip({title: "cloth", placement: "top"});

});
$(document).ready(function () {
    $('.furniture').tooltip({title: "furniture", placement: "top"});

});
$(document).ready(function () {
    $('.health_care').tooltip({title: "health care", placement: "top"});

});
$(document).ready(function () {
    $('.vehicle').tooltip({title: "vehicle", placement: "top"});

});
$(document).ready(function () {
    $('.house_maintance').tooltip({title: "house maintance", placement: "top"});

});