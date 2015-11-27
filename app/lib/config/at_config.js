// Go to this site for more information on setting the login template
// https://github.com/meteor-useraccounts/core/blob/master/Guide.md#features
// Settings are default, taken directly from the page above



AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,

    // Hooks
    //onLogoutHook: myLogoutFunc,
    //onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,

    // Texts
    texts: {
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password"
        },
    },
});