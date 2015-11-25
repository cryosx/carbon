Template.trees.helpers({
/*    Pencil: ['foo', 'bar', 'baz'],
    Pen: function(){
        if(Math.random() > 0.5){
            return true;
        }
        return false;
    }*/
    //can do things like if a person has 17 trees, add a star next to them or something
    //can use in trees2 to use javascript to create a graph and place it in a div in the
    //template file
});

Template.trees.events({
/*    'click #Save':function(event,template){
        console.log('Save button pressed');
        var Species=template.find("#Species").value;
        console.log(Species);
        //take values from the form that is being saved

        TreeCollection.find({species:'Pine'}, {$sort:{diameter:13}}
    }*/

    'click #save':function(event, template) {
        console.log('Saving a tree');
        var species=template.find("#species").value;
        console.log(species);
/*        TreeCollection.insert({
            name: species,
            score: 0
        });*/
    }
});

Template.trees.onCreated(function () {
    //add your statement here
});

Template.trees.onRendered(function () {
    //add your statement here
});

Template.trees.onDestroyed(function () {
    //add your statement here
});

