Template.goods.helpers({
    totalGoods: function() {
        return calculategoods();
    }
});

Template.goods.events({
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
                goods: {}

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
    },

    "change input": function() {
        updateGoods();
    }
});

Template.goods.onCreated(function () {
    //add your statement here
});

Template.goods.onRendered(function () {
    $('select').material_select();
});

Template.goods.onDestroyed(function () {
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

function updateGoods() {
    var totalGoods = calculateGoods();
    document.getElementById("totalGoodsEmissions").innerHTML = totalGoods.toFixed(2);

}

function calculateGoods() {

    var totalGoods = 0;

    var clothesSpentOn = (document.getElementById('clothesSpentOn').value);
    var furnitureSpentOn = (document.getElementById('furnitureSpentOn').value);
    var entertainmentSpentOn = (document.getElementById('entertainmentSpentOn').value);
    var paperSpentOn = (document.getElementById('paperSpentOn').value);
    var cleaningSpentOn = (document.getElementById('cleaningSpentOn').value);
    var medicalSpentOn = (document.getElementById('medicalSpentOn').value);
    var vehiclesSpentOn = (document.getElementById('vehiclesSpentOn').value);


    if (clothesSpentOn !== "") {
        var clothesCarbon = clothesSpentOn * 750 * 12 * 0.000001;
        totalGoods = totalGoods + clothesCarbon;
    }

    if (furnitureSpentOn !== "") {
        var furnitureCarbon = furnitureSpentOn * 614 * 12 * 0.000001;
        totalGoods = totalGoods + furnitureCarbon;
    }
    
    if (entertainmentSpentOn !== "") {
        var entertainmentCarbon = entertainmentSpentOn * 1279 * 12 * 0.000001;
        totalGoods = totalGoods + entertainmentCarbon;
    }

    if (paperSpentOn !== "") {
        var paperCarbon = paperSpentOn * 2100 * 12 * 0.000001;
        totalGoods = totalGoods + paperCarbon;
    }

    if (cleaningSpentOn !== "") {
        var cleaningCarbon = cleaningSpentOn * 954 * 12 * 0.000001;
        totalGoods = totalGoods + cleaningCarbon;
    }
    

    if (medicalSpentOn !== "") {
        var medicalCarbon = medicalSpentOn * 696 * 12 * 0.000001;
        totalGoods = totalGoods + medicalCarbon;
    }

    if (vehiclesSpentOn !== "") {
        var vehiclesCarbon = vehiclesSpentOn * 558 * 12 * 0.000001;
        totalGoods = totalGoods + vehiclesCarbon;
    }

    return totalGoods;
}