Template.transportation.helpers({
    //add you helpers here
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

