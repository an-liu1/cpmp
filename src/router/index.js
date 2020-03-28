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
        path: "/newproject",
        name: "newproject",
        component: () => import("../views/NewProject.vue"),
        // children: [
        //   {
        //     path: "/client",
        //     name: "client",
        //     component: () => import("../components/Minder.vue"),
        //     props: true
        //   },
        //   {
        //     path: "/leader",
        //     name: "leader",
        //     component: () => import("../components/Minder.vue"),
        //     props: true
        //   },
        //   {
        //     path: "/member",
        //     name: "member",
        //     component: () => import("../components/Minder.vue"),
        //     props: true
        //   },
        //   {
        //     path: "/media",
        //     name: "media",
        //     component: () => import("../components/Minder.vue"),
        //     props: true
        //   },
        //   {
        //     path: "/other",
        //     name: "other",
        //     component: () => import("../components/Minder.vue"),
        //     props: true
        //   }
        // ]
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
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
