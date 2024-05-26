import { createRouter, createWebHistory } from "vue-router";
import LogiN from "../views/LogiN.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      meta:{
        title: "登录",
        auth:false,
      },
      component: LogiN
    },
    {
      path: "/home",
      name: "home",
      meta:{
        title: "主页",
        auth:true,
      },
      component: import("../views/HomE.vue")
    },
  ]
});
export default router;
