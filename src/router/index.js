import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: "/",
        name: "homepage",
        component: () => import("../views/Homepage.vue")
      },
      {
        path: "/goal",
        name: "gaol",
        component: () => import("../views/Goal.vue")
      },
      {
        path: "/stakeholds",
        name: "stakeholds",
        component: () => import("../views/Stakeholds.vue")
      },
      {
        path: "/tasks",
        name: "tasks",
        component: () => import("../views/Tasks.vue")
      },
      {
        path: "/plans",
        name: "plans",
        component: () => import("../views/Plans.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue")
  }
];

const router = new VueRouter({
  routes
})

export default router
