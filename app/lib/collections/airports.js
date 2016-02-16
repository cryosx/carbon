// Run the following line in terminal in /app to import airports.csv (this is for Mac OSX or Linux machines and not for windows)
// You must be running meteor when you run the following command
//
// ./mongoimport --host localhost:3001 -d meteor -c Airports --type csv --file airports.csv --headerline
//
// NOTES: The .csv must have fields specified in the csv (--hardline option requires this otherwise the import won't be as expected)

Airports = new Meteor.Collection('Airports');