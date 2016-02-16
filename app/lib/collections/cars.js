// Run this line in terminal in /app to import car_efficiency.csv (this is for Mac OSX or Linux)
// You must be running meteor when you run the following command
//
// ./mongoimport --host localhost:3001 -d meteor -c CarEfficiency --type csv --file car_efficiency.csv --headerline
//
// NOTES: The .csv must have fields specified in the csv (--hardline option requires this otherwise the import won't be as expected)


Cars = new Meteor.Collection('Cars');
CarEfficiency = new Meteor.Collection('CarEfficiency');
CarMakes = new Meteor.Collection('CarMakes');