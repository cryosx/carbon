Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('Home', {
  name: 'Home',
  controller: 'HomeController',
  path: '/'
});