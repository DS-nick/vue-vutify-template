import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "UserList",
      component: () => import("./views/User/UserList.vue")
    }
  ]
});

export default router;
