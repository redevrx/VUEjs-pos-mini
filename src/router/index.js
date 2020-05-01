import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Dashboard.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //this route require auth check if logged in
    //if not , redirect to login page
    if (!store.getters.getToken) {
      next({
        path: "/",
        query: { redirect: to.fullPath.Login },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    //this route require auth check if logged in
    //if not , redirect to login page
    if (store.getters.getToken) {
      next({
        path: "/home",
        query: { redirect: to.fullPath.Home },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
