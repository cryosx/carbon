Template.car.helpers({
    //add you helpers here
});

Template.car.events({
    //add your events here
});

Template.car.onCreated(function () {
    //add your statement here
});

Template.car.onRendered(function () {
    $('.datepicker').pickadate({
        selectMonths: false, // Creates a dropdown to control month
        selectYears: 10 // Creates a dropdown of 15 years to control year
    });});

Template.car.onDestroyed(function () {
    //add your statement here
});

