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
