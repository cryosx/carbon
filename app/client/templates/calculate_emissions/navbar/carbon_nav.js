Template.carbonNav.helpers({

    enableIndicators: function(page_name) {
        if (page_name === "transportation") {
            $('ul.tabs').tabs('select_tab', '#' + page_name)
        } else if (page_name === "housing") {
            $('ul.tabs').tabs('select_tab', '#' + page_name)
        } else if (page_name === "food") {
            $('ul.tabs').tabs('select_tab', '#' + page_name)
        } else if (page_name === "goods") {
            $('ul.tabs').tabs('select_tab', '#' + page_name)
        }else if (page_name === "services") {
            $('ul.tabs').tabs('select_tab', '#' + page_name)
        }
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

