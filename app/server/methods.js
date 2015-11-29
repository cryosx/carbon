Meteor.methods({
    removeAllUserRecords: function () {
        return UserRecords.remove({});
    }
});

// Some Meteor Functions I've Used
//
//
// Meteor.users.find({"emails.address" : "cyruswu.email@gmail.com"}).fetch();