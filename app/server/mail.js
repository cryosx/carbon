/**
 * Created by cryosx on 11/16/15.
 */
Meteor.startup(function () {
    smtp = {
        username: "cyruswu.email@gmail.com",
        password: "1KcmPF8WlOtpXOBMXwWAqA",
        server:   'smtp.mandrillapp.com',
        port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});