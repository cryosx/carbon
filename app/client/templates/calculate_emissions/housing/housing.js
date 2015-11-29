Template.housing.helpers({
    //add you helpers here
});

Template.housing.events({
    "click #cancel": function() {
        var url = "/";
        window.location.replace(url);
    },
    "click #next": function() {
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "food");
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;

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

