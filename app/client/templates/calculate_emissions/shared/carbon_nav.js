Template.carbonNav.helpers({
    isTransportation: function(page_name) {
        if (page_name === "transportation") {
            return "nav_active";
        }
        return "";
    },
    isHousing: function(page_name) {
        if (page_name === "housing") {
            return "nav_active";
        }
        return "";
    },
    isFood: function(page_name) {
        if (page_name === "food") {
            return "nav_active";
        }
        return "";
    },
    isShopping: function(page_name) {
        if (page_name === "shopping") {
            return "nav_active";
        }
        return "";
    }
});

Template.carbonNav.events({
    //add your events here
});

Template.carbonNav.onCreated(function () {
    //add your statement here
});

Template.carbonNav.onRendered(function () {
    //add your statement here
});

Template.carbonNav.onDestroyed(function () {
    //add your statement here
});

