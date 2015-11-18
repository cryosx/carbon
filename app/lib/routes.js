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

Router.route('Trees', {
  name: 'Trees',
  controller: 'TreeController',
  path: '/Trees'
});

Router.route('Trees2', {
  name: 'Trees2',
  controller: 'TreeController',
  path: '/Trees2'
});

Router.route('Trees3', {
  name: 'Trees3',
  controller: 'TreeController',
  path: '/Trees3'
});