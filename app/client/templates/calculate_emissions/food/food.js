Template.food.helpers({
    //add you helpers here
});

Template.food.events({
    "click #cancel": function() {
        var url = "/";
        window.location.replace(url);
    },
    "click #next": function() {
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "shopping");
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;

    }
});

Template.food.onCreated(function () {
    //add your statement here
});

Template.food.onRendered(function () {
    $('select').material_select();
});

Template.food.onDestroyed(function () {
    //add your statement here
});

