// Run this line in terminal in /app to import car_efficiency.csv (this is for Mac OSX or Linux)
//
// ./mongoimport --host localhost:3001 -d meteor -c CarEfficiency --type csv --file car_efficiency.csv --headerline
//
//
Cars = new Meteor.Collection('Cars');
CarEfficiency = new Meteor.Collection('CarEfficiency');
CarMakes = new Meteor.Collection('CarMakes');