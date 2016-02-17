StandardLegends = new Mongo.Collection(null);


//only works for 1 field so far (as far as I know)
//try using: https://atmospherejs.com/sergeyt/typeahead
Template.autoComplete.helpers({
    settings: function() {
        return {
            position: Session.get("position"),
            limit: 5,
            rules: [
                {
                    // token: '',
                    collection: TreeDiameter,
                    field: 'genus',
                    matchAll: true,
                    template: Template.standardLegends
                    }
            ]
        };
    },
    legends: function() {
        return StandardLegends.find();
    },


    blurFunction: function(){
        console.log("hello world");
    }

});

Template.autoComplete.events({
    "autocompleteselect input": function(event, template, doc) {
        console.log("selected ", doc);
        var selected = doc;
        console.log(doc.name);
    }
});

Template.autoComplete.onCreated(function () {
    //add your statement here
});

Template.autoComplete.onRendered(function () {
    //add your statement here
});

Template.autoComplete.onDestroyed(function () {
    //add your statement here
});

