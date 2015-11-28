Template.carousel.helpers({
    //add you helpers here
});

Template.carousel.events({
    //add your events here
});

Template.carousel.onCreated(function () {
});

Template.carousel.onRendered(function () {
    $("#test-carousel").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds
        stopOnHover : false,
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });
});

Template.carousel.onDestroyed(function () {
    //add your statement here
});

// Custom Navigation Events
var owl = $("#test-carousel");
$(".next").click(function(){
    owl.trigger('owl.next');
})
$(".prev").click(function(){
    owl.trigger('owl.prev');
})
$(".play").click(function(){
    owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
})
$(".stop").click(function(){
    owl.trigger('owl.stop');
})