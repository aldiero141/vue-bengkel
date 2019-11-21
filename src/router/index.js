import Vue from 'vue';
import Router from 'vue-router';
const DashboardLayout = () =>
  import('../components/dashboardLayout.vue');

function loadView(view) {
  return () =>
    import(`../components/dashboardContents/${view}.vue`);
}

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        name: 'UserController',
        path: '/',
        component: loadView('userController')
      },
      {
        name: 'ServiceController',
        path: '/service',
        component: loadView('serviceController')
      },
      {
        name: 'SparepartController',
        path: '/sparepart',
        component: loadView('sparepartController')
      },
      {
        name: 'TowingController',
        path: '/towing',
        component: loadView('towingController')
      },
      {
        name: 'ProfileController',
        path: '/profile',
        component: loadView('ProfileController')
      },
    ]
  }
];
Vue.use(Router);
const router = new Router({ mode: 'history', routes: routes });
export default router;
