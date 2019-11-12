import Vue from "vue";
import Router from "vue-router";
import { getToken } from "../utils/auth";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

import routes from "./routes";

Vue.use(Router);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
const createRouter = routes2 =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: to => {
      if (to.path.includes("/user/messages")) {
        return { x: 0, y: 900 };
      }
      return { x: 0, y: 0 };
    },
    routes: routes2
  });
const router = createRouter(routes);
export function resetRouter(routes) {
  const newRouter = createRouter(routes);
  router.matcher = newRouter.matcher; // reset router
}

export default function({ store }) {
  // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465

  // const Router = new VueRouter({
  //   scrollBehavior: to => {
  //     if (to.path.includes("/user/messages")) {
  //       return { x: 0, y: 900 };
  //     }
  //     return { x: 0, y: 0 };
  //   },
  //   routes,

  //   // Leave these as is and change from quasar.conf.js instead!
  //   // quasar.conf.js -> build -> vueRouterMode
  //   // quasar.conf.js -> build -> publicPath
  //   mode: process.env.VUE_ROUTER_MODE,
  //   base: process.env.VUE_ROUTER_BASE
  // });
  const whiteList = ["/login"]; // no redirect whitelist
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
      if (to.path === "/login") {
        // if is logged in, redirect to the home page
        next({ path: "/home" });
        NProgress.done();
      } else {
        const hasGetUserInfo = store.getters.info;
        if (!hasGetUserInfo) {
          await store.dispatch("user/getInfo");
        }

        try {
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            store.getters.info.roles
          );
          resetRouter(accessRoutes);

          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          next(`/login`);
          NProgress.done();
        }
      }
    } else {
      /* has no token*/
      store.commit("user/SET_INFO", "");
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login`);
        NProgress.done();
      }
    }
  });
  router.afterEach(() => {
    // finish progress bar
    NProgress.done();
  });

  return router;
}
