Template.Trees.helpers({
    Pencil: ['foo', 'bar', 'baz'],
    Pen: function(){
        if(Math.random() > 0.5){
            return true;
        }
        return false;
    }
    //can do things like if a person has 17 trees, add a star next to them or something
    //can use in trees2 to use javascript to create a graph and place it in a div in the
    //template file
});

Template.Trees.events({
    'click #Save':function(event,template){
        console.log('Save button pressed');
        var Species=template.find("#Species").value;
        console.log(Species);
        //take values from the form that is being saved
    }
});

Template.Trees.onCreated(function () {
    //add your statement here
});

Template.Trees.onRendered(function () {
    //add your statement here
});

Template.Trees.onDestroyed(function () {
    //add your statement here
});

