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
    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8
            };
        }
    }
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
        var location=template.find("#location").value;
        var latitude=template.find("#latitude").value;
        var longitude=template.find("#longitude").value;
        var datePlanted=template.find("#datePlanted").value;
        var diameter=template.find("#diameter").value;
        //var createdDate=newDate();
        var tree={'userID':Meteor.user()._id,
            'species':species,
            'location':location,
            'latitude':latitude,
            'longitude':longitude,
            'datePlanted':datePlanted,
            'diameter':diameter,
            //'created':createdDate
        };
        //tree['userID']=Meteor.user()._id; //or tree.key=value
        console.log(tree);
        console.log(Meteor.user()._id);

        TreeCollection.insert(tree);

        var treeID;

        //see methods.js in server
/*        Meteor.call('insertTree', tree, function(error, result){
            console.log(result);
            treeID=result;
        });*/


        //to get last inputted tree
        //Session.set('lastTreePlanted', treeID);
    }
});

Template.trees.onCreated(function () {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});

Template.trees.onRendered(function () {
    GoogleMaps.load();
});

Template.trees.onDestroyed(function () {
    //add your statement here
});

