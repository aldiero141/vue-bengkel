import Vue from 'vue';
import Router from 'vue-router';
const DashboardLayout = () =>
  import('../components/dashboardLayout.vue');

const LoginLayout = () =>
  import('../components/loginLayout.vue');

const RegisterLayout = () =>
  import('../components/registerLayout.vue');

function loadView(view) {
  return () =>
    import(`../components/dashboardContents/${view}.vue`);
}

function isAuthenticated() {
  if (localStorage.getItem('token') == null) {
    return true;
  }
}

const routes = [{
    path: '/dashboard',
    component: DashboardLayout,
    children: [{
        name: 'HomeController',
        path: '/home',
        component: loadView('homeController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'ServiceController',
        path: '/service',
        component: loadView('serviceController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'SparepartController',
        path: '/sparepart',
        component: loadView('sparepartController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'TowingController',
        path: '/towing',
        component: loadView('towingController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'ProfileController',
        path: '/profile',
        component: loadView('profileController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      }
    ]
  },
  {
    path: '/',
    component: LoginLayout,
    name: 'loginLayout',
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next('/home');
      }
    }
  },
  {
    path: '/register',
    component: RegisterLayout,
    name: 'registerLayout',
  },

];
Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: routes
});
export default router;