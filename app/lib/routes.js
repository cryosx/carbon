Router.configure({
    layoutTemplate: "MasterLayout",
    loadingTemplate: "Loading",
    notFoundTemplate: "NotFound"
});


Router.route("home", {
    name: "home",
    controller: "HomeController",
    path: "/",
    progress: true,
    progressSpinner : false
});

Router.route("emissions", {
    name: "emissions",
    controller: "EmissionsController",
    path: "/emissions",
    progress: true,
    progressSpinner : false
});

Router.route("pathways",{
    name: "pathways",
    controller: "EmissionsController",
    path: "/pathways",
    progress: true,
    progressSpinner : false
});

Router.route("technology",{
    name: "technology",
    controller: "HomeController",
    path: "/about/technology",
    progress: true,
    progressSpinner : false
});

//Router.route("transportation", {
//    name: "transportation",
//    controller: "EmissionsController",
//    path: "/transportation"
//});
//
//Router.route("housing", {
//    name: "housing",
//    controller: "EmissionsController",
//    path: "/housing"
//});
//
//
//Router.route("food", {
//    name: "food",
//    controller: "EmissionsController",
//    path: "/food"
//});
//
//
//Router.route("goods", {
//    name: "goods",
//    controller: "EmissionsController",
//    path: "/goods"
//});
//
//Router.route("services",{
//    name: "services",
//    controller: "EmissionsController",
//    path: "/services"
//});

Router.route("trees", {
    name: "trees",
    controller: "TreeController",
    path: "/trees"
});

Router.route("trees2", {
    name: "trees2",
    controller: "TreeController",
    path: "/trees2"
});

Router.route("trees3", {
    name: "trees3",
    controller: "TreeController",
    path: "/trees3"
});