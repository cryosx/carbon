Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('home', {
  name: 'home',
  controller: 'HomeController',
  path: '/'
});

Router.route('emissions', {
  name: 'emissions',
  controller: 'HomeController',
  path: '/emissions'
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

Router.route('trees', {
  name: 'trees',
  controller: 'TreeController',
  path: '/trees'
});

Router.route('trees2', {
  name: 'trees2',
  controller: 'TreeController',
  path: '/trees2'
});

Router.route('trees3', {
  name: 'trees3',
  controller: 'TreeController',
  path: '/trees3'
});