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
        name: 'BranchController',
        path: '/branch',
        component: loadView('branchController')
      },
    ]
  }
];
Vue.use(Router);
const router = new Router({ mode: 'history', routes: routes });
export default router;
