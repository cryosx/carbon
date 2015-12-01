Meteor.publish('CarbonStats', function () {
    return CarbonStats.find();
});
