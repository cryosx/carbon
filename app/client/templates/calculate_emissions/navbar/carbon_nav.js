Template.carbonNav.helpers({
    totalTransportationCarbon: function() {
        return Session.get("totalCarCarbon") + Session.get("totalMotorcycleCarbon") + Session.get("totalBusCarbon") + Session.get("totalRailCarbon") + Session.get("totalFlyingCarbon");
    }
});

Template.carbonNav.events({
    //add your events here
});

Template.carbonNav.onCreated(function () {
    //add your statement here
});

Template.carbonNav.onRendered(function () {
    $('ul.tabs').tabs();
});

Template.carbonNav.onDestroyed(function () {
    //add your statement here
});

