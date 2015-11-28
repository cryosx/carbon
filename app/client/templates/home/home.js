Template.home.helpers({
});


Template.home.events({
    "click #emissionsLink": function() {
        //event.preventDefault();
        //goToEmissions();
        setTimeout(scrollToTop, 2000);
    }
});



Template.home.onCreated(function () {
    //$('.parallax').parallax();
    //window.disqus = new Disqus('cryosx-carbon');

});

Template.home.onRendered(function () {
    $('.parallax').parallax();
    window.disqus = new Disqus('cryosx-carbon');
    disqus.loadComments();

});

Template.home.onDestroyed(function () {
});

function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

function goToEmissions() {
    var url = "/emissions";
    window.location.replace(url);
}