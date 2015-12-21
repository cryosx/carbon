Template.trees2.helpers({
    //add you helpers here

});

Template.trees2.events({
    'click #cancel2':function(event,template){
        console.log(CarbonStats.find().count());
    }
});

Template.trees2.onCreated(function () {
    //add your statement here
});

Template.trees2.onRendered(function () {
    //add your statement here
});

Template.trees2.onDestroyed(function () {
    //add your statement here
});

