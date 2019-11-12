import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import permission from "./modules/permission";
import getters from "./getters";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user,
      permission
    },
    getters,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
