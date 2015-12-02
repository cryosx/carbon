Template.pathways.helpers({
    getTotalCarbon: function(){
        return getTotalCarbon();
    },
    getYear: function() {
        return getYear();
    }
});

Template.pathways.events({
    //"click": function() {
    //    getTotalCarbon();
    //}
    "click #treesLink": function() {
        //event.preventDefault();
        //goToEmissions();
        setTimeout(scrollToTop, 1000);
    },
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

function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, 300);
}
function getTotalCarbon() {

    var records = CarbonStats.find({userID: Meteor.userId(), year: 2015}).fetch();
    var record = records[0];
    var totalCarbon = record.totalCarbon;
    return totalCarbon;
}

function getYear() {

    var records = CarbonStats.find({userID: Meteor.userId(), year: 2015}).fetch();
    var record = records[0];
    var year = record.year;
    return year;
}