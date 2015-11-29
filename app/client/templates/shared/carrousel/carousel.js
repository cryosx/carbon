Template.carousel.helpers({
    //add you helpers here
});

var owl = $("#test-carousel");

Template.carousel.events({

});

Template.carousel.onCreated(function () {
});

Template.carousel.onRendered(function () {
    var owl = $(".owl-carousel").owlCarousel({

        autoPlay: 5000, //Set AutoPlay to 3 seconds
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

    $(".next").click(function(){
        owl.trigger('owl.next');
    })
    $(".prev").click(function(){
        owl.trigger('owl.prev');
    })
    $(".play").click(function(){
        owl.trigger('owl.play',5000); //owl.play event accept autoPlay speed as second parameter
    })
    $(".stop").click(function(){
        owl.trigger('owl.stop');
    })

});

Template.carousel.onDestroyed(function () {
    //add your statement here
});
