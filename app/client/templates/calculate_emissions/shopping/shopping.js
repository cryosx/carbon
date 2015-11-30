Template.shopping.helpers({
    //add you helpers here
});

Template.shopping.events({
    "click #cancel": function(){
        var url = "/";
        window.location.replace(url);
    },
    "submit": function() {
        console.log("SUBMIT");
        //event.preventDefault();
        return false;
    }
});

Template.shopping.onCreated(function () {
    //add your statement here
});

Template.shopping.onRendered(function () {
    $('select').material_select();
});

Template.shopping.onDestroyed(function () {
    //add your statement here
});


