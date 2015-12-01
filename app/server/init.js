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
});