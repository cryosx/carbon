Template.uploads.helpers({
    'infoLabel': function() {
        var instance = Template.instance();

        // we may have not yet selected a file
        var info = instance.info.get()
        if (!info) {
            return;
        }

        var progress = instance.globalInfo.get();

        // we display different result when running or not
        return progress.running ?
        info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
        info.name + ' - ' + info.size + 'B';
    },
    'progress': function() {
        return Template.instance().globalInfo.get().progress + '%';
    }});

Template.uploads.events({
    'click .start': function (e) {
        Uploader.startUpload.call(Template.instance(), e);
    }});

Template.uploads.onCreated(function () {
    Uploader.init(this);
});

Template.uploads.onRendered(function () {
    Uploader.render.call(this);
});

Template.uploads.onDestroyed(function () {
    //add your statement here
});

