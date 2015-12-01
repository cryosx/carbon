Template.pathways.helpers({
    getTotalCarbon: function(){
        return getTotalCarbon();
    }
});

Template.pathways.events({
    "click": function() {
        getTotalCarbon();
    }
});

Template.pathways.onCreated(function () {
    //add your statement here
});

Template.pathways.onRendered(function () {
    $('.parallax').parallax();
    window.disqus = new Disqus('cryosx-carbon');
    disqus.loadComments();});

Template.pathways.onDestroyed(function () {
    //add your statement here
});

var records = CarbonStats.find({userID: Meteor.userId(), year: 2015}).fetch();
var record = records[0];

function getTotalCarbon() {
    var totalCarbon = record.totalCarbon;
    console.log(totalCarbon);
    return totalCarbon;
}
