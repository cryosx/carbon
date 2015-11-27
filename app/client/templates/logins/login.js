Template.login.helpers({
    //add you helpers here
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        console.log("Form submitted.");
        Meteor.loginWithPassword(emailVar, passwordVar);

    }
});

Template.login.onCreated(function () {
    //add your statement here
});

Template.login.onRendered(function () {
    //add your statement here
});

Template.login.onDestroyed(function () {
    //add your statement here
});

