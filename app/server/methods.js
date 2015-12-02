Meteor.methods({
    removeAllUserRecords: function () {
        return UserRecords.remove({});
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



// Some Meteor Functions I've Used
//
//
// Meteor.users.find({"emails.address" : "cyruswu.email@gmail.com"}).fetch();