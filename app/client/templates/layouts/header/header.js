Template.header.helpers({
    //add you helpers here
});

Template.header.events({
    "click #sign-in-button": function() {
        $('.button-collapse').sideNav('hide');
    },
    "click #log-out-button": function() {
        $('.button-collapse').sideNav('hide');
    },
    "click": function() {
        console.log("YES");
    }
});

Template.header.onCreated(function () {
    //add your statement here
});

Template.header.onRendered(function () {
    $(".button-collapse").sideNav({
        menuWidth: 300,
        closeOnClick: true

    });
});

Template.header.onDestroyed(function () {
    //add your statement here
});


