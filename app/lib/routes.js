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


Router.route('transportation', {
  name: 'transportation',
  controller: 'HomeController',
  path: '/transportation'
});

Router.route('housing', {
  name: 'housing',
  controller: 'HomeController',
  path: '/housing'
});


Router.route('food', {
  name: 'food',
  controller: 'HomeController',
  path: '/food'
});


Router.route('shopping', {
  name: 'shopping',
  controller: 'HomeController',
  path: '/shopping'
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