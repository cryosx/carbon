Template.fixedActionButton.helpers({
    //add you helpers here
});

Template.fixedActionButton.events({
    "click #scroll-up": function() {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 2000);
        return false;
    },
    "click #scroll-down": function() {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $(document).height() }, 2000);
        return false;
    }
});

Template.fixedActionButton.onCreated(function () {
    //add your statement here
});

Template.fixedActionButton.onRendered(function () {
    //add your statement here
});

Template.fixedActionButton.onDestroyed(function () {
    //add your statement here
});

