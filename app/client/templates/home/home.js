Template.home.events({
});

Template.home.helpers({
});

Template.home.onCreated(function () {
    $('.parallax').parallax();
    window.disqus = new Disqus('cryosx-carbon');

});

Template.home.onRendered(function () {
    $('.parallax').parallax();
    window.disqus = new Disqus('cryosx-carbon');
    disqus.loadComments();

});

Template.home.onDestroyed(function () {
});

