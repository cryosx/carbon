Template.pathways.helpers({
    //add you helpers here
});

Template.pathways.events({
    //add your events here
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

