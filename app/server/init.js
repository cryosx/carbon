/**
 * Created by Sy on 11/18/2015.
 */
//file:/server/init.js
Meteor.startup(function () {
    /*    UploadServer.init({
     tmpDir: '/Uploads/tmp',
     uploadDir: '/Uploads/',
     checkCreateDirectories: true,
     getDirectory: function(fileInfo, formData) {
     // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
     return formData.contentType;
     },
     finished: function(fileInfo, formFields) {
     // perform a disk operation
     },
     cacheTime: 100,
     mimeTypes: {
     "xml": "application/xml",
     "vcf": "text/x-vcard"
     }
     });*/

    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        checkCreateDirectories: true //create the directories for you
    });

    if (Cars.find({}).fetch().length === 0) {
        var cars = CarEfficiency.find({}, {sort:{make: 1, model: 1, year:1}}).fetch();
        var carsArray = [];
        var j = -1;
        var k = 0;
        var l = 0;
        var make = "";
        var model = "";
        var year = -1;

        // Following Code only works if CarEfficiency is correctly sorted, the problem so far seems to be that MonogoImport doesn't import
        // the CSV file in the same order, and the Sort Specifier for mongo is a little weird.
        for(var i = 0; i < cars.length; i++) {
            if (make !== cars[i].make) {
                j++;
                k = 0;
                l = 0;
                make = cars[i].make;
                model = cars[i].model;
                year = cars[i].year;
            }
            if (carsArray[j] === undefined) {
                carsArray.push({make: cars[i].make, models:[{model: cars[i].model, years:[{year: cars[i].year, MPG: cars[i].MPG, KPG: cars[i].KPG}]}]});
            } else {

                if (model !== cars[i].model) {
                    k++;
                    l = 0;
                    model = cars[i].model;
                    year = cars[i].year;
                }
                if (carsArray[j].models[k] === undefined) {
                    carsArray[j].models.push({model: cars[i].model, years:[{year: cars[i].year, MPG: cars[i].MPG, KPG: cars[i].KPG}]});
                } else {
                    if (year !== cars[i].year) {
                        l++;
                        year = cars[i].year;
                    }
                    if (carsArray[j].models[k].years[l] === undefined) {
                        carsArray[j].models[k].years.push({year: cars[i].year, MPG: cars[i].MPG, KPG: cars[i].KPG});
                    }
                }
            }
        }

        //console.log(cars.length);
        //console.log(carsArray.length);
        carsArray.sort(function(a,b) {
            return a.make.toUpperCase().localeCompare(b.make.toUpperCase());
        });
        for (var i = 0; i < carsArray.length; i++) {
            Cars.insert(carsArray[i]);
        }
    } else {
        //var temp = Cars.find({}, {sort:{make:1}}).fetch();
        //
        //temp.sort(function(a,b) {
        //    return a.make.toUpperCase().localeCompare(b.make.toUpperCase());
        //});
        //for (var i = 0; i < temp.length; i++) {
        //    console.log(temp[i].make);
        //}
        //console.log(temp.length);
    }

});