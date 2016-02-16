
//  USER RELATED COLLECTIONS

Meteor.publish('UserRecords', function () {
    return UserRecords.find();
});

Meteor.publish('UserProfiles', function () {
    return UserProfiles.find();
});

Meteor.publish('Rankings', function () {
    return Rankings.find();
});


Meteor.publish('CarbonStats', function () {
    return CarbonStats.find();
});

//  CAR RELATED COLLECTIONS

Meteor.publish('Cars', function () {
    return Cars.find();
});

Meteor.publish('CarEfficiency', function () {
    return CarEfficiency.find();
});

Meteor.publish('CarMakes', function() {
    return CarMakes.find();
});

//  TREE COLLECTIONS

Meteor.publish('TreeCollection', function () {
    return TreeCollection.find();
});

Meteor.publish('TreeSpecies', function () {
    return TreeSpecies.find();
});

Meteor.publish('TreeDiameter', function () {
    return TreeDiameter.find();
});