CarbonStats = new Mongo.Collection('carbonstats');

CarbonStats.before.insert(function(userId,doc){
    doc.createdAt = moment().toDate();
});