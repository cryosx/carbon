Template.trees2.helpers({
    //add you helpers here

});

Template.trees2.events({
    'click #cancel2':function(event,template){
        treeDelete = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();
        treeDeleteID = treeDelete[treeDelete.length -1]._id;
        TreeCollection.remove({"_id" : treeDeleteID});
    }
});

Template.trees2.onCreated(function () {
    //add your statement here
});

Template.trees2.onRendered(function () {
    //add your statement here
    //$('#dbtest').html('Hello');

    var treeRecord;
    //fix this, sort isn't working properly.  I had to brute force find the last entry by doing length -1
    treeRecord = TreeCollection.find({userID: Meteor.userId()}, {sort : ['createdDate', 'dsc']}).fetch();

    console.log(treeRecord[treeRecord.length -1].location);
    console.log(treeRecord);

    $('#species2').html(treeRecord[treeRecord.length -1].species);
    $('#location2').html(treeRecord[treeRecord.length -1].location);
    $('#datePlanted2').html(treeRecord[treeRecord.length -1].datePlanted);
    $('#diameter2').html(treeRecord[treeRecord.length -1].diameter);

    //record = TreeCollection.find().sort({"createdDate":-1});
    //record = TreeCollection.find().sort({"createdDate":-1}).limit(1);
    //record = TreeCollection.find({}, {sort : ['createdDate', 'dsc']});
    //TreeCollection.find( { $query: {}, $orderBy: { createdDate : -1 } } );
    //TreeCollection.find().fetch();
    //TreeCollection.find( {$query: [], $orderBy: { createdDate: -1 } } );
});

Template.trees2.onDestroyed(function () {
    //add your statement here
});

