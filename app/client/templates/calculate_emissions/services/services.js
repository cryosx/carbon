Template.services.helpers({
    totalServices: function() {
        return calculateServices();
    }
});

Template.services.events({
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
                goods: {},
                Services: {}

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
        updateServices();
    }
});

Template.services.onCreated(function () {
    //add your statement here
});

Template.services.onRendered(function () {
    $('select').material_select();
});

Template.services.onDestroyed(function () {
    //add your statement here
});



function validateTransport() {
    var errors =[];


    $('#transportation-form *').filter(':input').each(function(){
        if($(this).val() === "") {
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

    var errors =[];

    $('#housing-form *').filter(':input').each(function(){
        if($(this).val() === "") {
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

    var errors =[];

    $('#food-form *').filter(':input').each(function(){
        if($(this).val() === "") {
            error.push("Errors");
        }

    });
    if (errors.length > 0 ) {
        $("ul.tabs").tabs("select_tab", "food");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return validateGoods();
}

function validateGoods() {

    var errors =[];

    $('#food-form *').filter(':input').each(function(){
        if($(this).val() === "") {
            error.push("Errors");
        }

    });
    if (errors.length > 0 ) {
        $("ul.tabs").tabs("select_tab", "goods");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return true;
}
function updateServices() {
    var totalServices = calculateServices();
    document.getElementById("totalServicesEmissions").innerHTML = totalServices.toFixed(2);

}

function calculateServices() {

    var totalServices = 0;

    var healthSpentOn = (document.getElementById('healthSpentOn').value);
    var communicationsSpentOn = (document.getElementById('communicationsSpentOn').value);
    var vehiclesSpentOn = (document.getElementById('vehiclesSpentOn').value);
    var maintenanceSpentOn = (document.getElementById('maintenanceSpentOn').value);

    
    if (healthSpentOn !== "") {
        var healthCarbon = healthSpentOn * 1151 * 12 * 0.000001;
        totalServices = totalServices + healthCarbon;
    }

    if (communicationsSpentOn !== "") {
        var communicationsCarbon = communicationsSpentOn * 291 * 12 * 0.000001;
        totalServices = totalServices + communicationsCarbon;
    }

    if (vehiclesSpentOn !== "") {
        var vehiclesCarbon = vehiclesSpentOn * 433 * 12 * 0.000001;
        totalServices = totalServices + vehiclesCarbon;
    }
    if (maintenanceSpentOn !== "") {
        var maintenanceCarbon = maintenanceSpentOn * 134 * 12 * 0.000001;
        totalServices = totalServices + maintenanceCarbon;
    }


    return totalServices;
}