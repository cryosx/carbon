Template.technology.helpers({
    //add you helpers here
});

Template.technology.events({
    //add your events here
});

Template.technology.onCreated(function () {
    //add your statement here
});

Template.technology.onRendered(function () {
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('.parallax').parallax();

    var owl = $(".owl-carousel").owlCarousel({

        autoPlay: 7000, //Set AutoPlay to 3 seconds
        items : 1,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

    $(".next").click(function(){
        owl.trigger('owl.next');
    });
    $(".prev").click(function(){
        owl.trigger('owl.prev');
    });
    $(".play").click(function(){
        owl.trigger('owl.play',7000); //owl.play event accept autoPlay speed as second parameter
    });
    $(".stop").click(function(){
        owl.trigger('owl.stop');
    });
    $("body").keydown(function(e) {
        if(e.keyCode == 37) {
            // left
            owl.trigger('owl.prev');
        }
        else if(e.keyCode == 39) {
            // right
            owl.trigger('owl.next');
        }
    });
    $('.materialboxed').materialbox();
    $('.slider').slider({full_width: true});

});

Template.technology.onDestroyed(function () {
    //add your statement here
});

