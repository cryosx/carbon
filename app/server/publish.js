Meteor.publish('CarbonStats', function () {
    return CarbonStats.find();
});

Meteor.publish('UserRecords', function () {
    return UserRecords.find();
});

Meteor.publish('UserProfiles', function () {
    return UserProfiles.find();
});

Meteor.publish('Rankings', function () {
    return Rankings.find();
});

Meteor.publish('TreeCollection', function () {
    return TreeCollection.find();
});

Meteor.publish('TreeSpecies', function () {
    return TreeSpecies.find();
});