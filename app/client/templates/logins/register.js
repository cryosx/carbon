Template.register.helpers({
    //add you helpers here
});

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        console.log("Form submitted.");
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
    }
});

Template.register.onCreated(function () {
    //add your statement here
});

Template.register.onRendered(function () {
    //add your statement here
});

Template.register.onDestroyed(function () {
    //add your statement here
});

