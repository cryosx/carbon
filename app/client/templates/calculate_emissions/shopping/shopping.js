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
        event.preventDefault();
        if (validateTransport()) {
            console.log("DONE VALIDATING");
            var record = {
                userID: Meteor.userId(),
                year: 2015,
                transportation: {units: document.getElementById('units').value, },
                housing: {},
                food: {},
                shopping: {}

            };
            var records = CarbonStats.find({userID: Meteor.userId(), year:2015}).fetch();
            if (records.length > 0) {
                CarbonStats.update({userID: Meteor.userId(), year:2015}, record);
            } else {
                CarbonStats.insert(record);

            }

            console.log("AFTER");
        }
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



function validateTransport() {
    console.log("Transport");
    var errors =[];


    $('#transportation-form *').filter(':input').each(function(){
        if($(this).val() === "") {
            console.log("THIS SHOULD BE IT");
            errors.push(this);
        }
    });
    if (errors.length > 0) {
        $("ul.tabs").tabs("select_tab", "transportation");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return validateHousing();
}

function validateHousing() {
    console.log("Housing");

    var errors =[];

    $('#housing-form *').filter(':input').each(function(){
        //console.log($(this).val());
        if($(this).val() === "") {
            //console.log("THIS IS EMPTY");
            errors.push("Errors");
        }
    });

    if (errors.length > 0) {
        $("ul.tabs").tabs("select_tab", "housing");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return validateFood();
}
function validateFood() {
    console.log("Food");

    var errors =[];

    $('#food-form *').filter(':input').each(function(){
        //console.log($(this).val());
        if($(this).val() === "") {
            console.log("WHY FOOD?");
            error.push("Errors");
        }

    });
    if (errors.length > 0 ) {
        $("ul.tabs").tabs("select_tab", "food");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return true;
}

