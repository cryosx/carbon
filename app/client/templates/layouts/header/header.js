Template.header.helpers({
    //add you helpers here
});

Template.header.events({
    "click #sign-in-button": function() {
        console.log("NO");
        $(".side-nav").slideToggle(2000);
    },
    "click #log-out-button": function() {
        console.log("NO");
        $(".side-nav").slideToggle(2000);
    },
    "click": function() {
        console.log("YES");
    }
});

Template.header.onCreated(function () {
    //add your statement here
});

Template.header.onRendered(function () {
    $(".button-collapse").sideNav();
});

Template.header.onDestroyed(function () {
    //add your statement here
});


