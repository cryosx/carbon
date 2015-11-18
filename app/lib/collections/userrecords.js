/**
 * Created by cryosx on 11/17/15.
 */
UserRecords = new Mongo.Collection('userrecords');

UserRecords.before.insert(function(userId,doc){
    doc.createdAt = moment().toDate();
});