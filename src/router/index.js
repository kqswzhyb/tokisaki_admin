import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function(/* { store, ssrContext } */) {
  const routerPush = VueRouter.prototype.push;
  VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
  };
  const Router = new VueRouter({
    scrollBehavior: to => {
      if (to.path.includes("/user/messages")) {
        return { x: 0, y: 900 };
      }
      return { x: 0, y: 0 };
    },
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
