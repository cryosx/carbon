Meteor.methods({
    removeAllUserRecords: function () {
        return UserRecords.remove({});
    },
    removeAllUserProfiles: function() {
        return UserProfiles.remve({});
    },
    removeAllCarbonStatsRecords: function () {
        return CarbonStats.remove({});
    },

    'insertTree':function(tree){
        var val = TreeCollection.insert(tree);
        console.log(val);
        return val;
    }
});
