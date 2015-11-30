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
    },
    "click #disqus-comments": function() {
        $('html, body').animate({
            scrollTop: $("#disqus_thread").offset().top - 80
        }, 2000);
    }
});

Template.fixedActionButton.onCreated(function () {
    //add your statement here
});

Template.fixedActionButton.onRendered(function () {

});

Template.fixedActionButton.onDestroyed(function () {
    //add your statement here
});

