Meteor.publish('CarbonStats', function () {
    return CarbonStats.find();
});

Meteor.publish('UserRecords', function () {
    return UserRecords.find();
});

Meteor.publish('UserProflies', function () {
    return UserProfiles.find();
});

Meteor.publish('Rankings', function () {
    return Rankings.find();
});