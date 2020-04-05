import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/Welcome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
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
        path: "/project/:id",
        name: "project",
        component: () => import("../views/Project.vue")
      },
      {
        path: "/newproject",
        name: "newproject",
        component: () => import("../views/NewProject.vue")
      },
      {
        path: "/exampleproject",
        name: "exampleproject",
        component: () => import("../views/ExampleProject.vue")
      },
      {
        path: "/myprojects",
        name: "myprojects",
        component: () => import("../views/MyProject.vue")
      },      
      {
        path: "/myinfo",
        name: "myinfo",
        component: () => import("../views/MyInfo.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
