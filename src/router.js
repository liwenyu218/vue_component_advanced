import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/form",
      component: () => import("./views/MyFrom.vue"),
    },
    {
      path: "/findComponents",
      component: () => import("./demo/findComponents/ComponentA.vue"),
    },
    {
      path: "/checkbox",
      component: () => import("./views/MyCheckboxGroup.vue"),
    },
    {
      path: "/radio",
      component: () => import("./views/MyRadio.vue"),
    },
    {
      path: "/display",
      component: () => import("./views/MyDisplay.vue"),
    },
    {
      path: "/alert",
      component: () => import("./views/MyAlert.vue"),
    },
    {
      path: "/render",
      component: () => import("./views/RenderFunction.vue"),
    },
    {
      path: "/tableRender",
      component: () => import("./views/MyTableRender.vue"),
    },
  ],
});
