Template.dashboard.helpers({
    //add you helpers here
});

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.dashboard.onCreated(function () {
    //add your statement here
});

Template.dashboard.onRendered(function () {
    //add your statement here
});

Template.dashboard.onDestroyed(function () {
    //add your statement here
});

