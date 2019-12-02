import { getToken, removeToken } from "../../utils/auth";
import { resetRouter, routerOther } from "../../router/index";
import routes from "../../router/routes";
import axios from "axios";

const state = {
  token: getToken(),
  info: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  }
};

const actions = {
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: "http://localhost:8090/api/me",
        headers: { Authorization: `Bearer ${getToken()}` }
      })
        .then(res => {
          if (res.status === 200) {
            const info = Object.assign({}, res.data);
            res.data.user.totalScore = res.data.user.totalScore
              ? Number(res.data.user.totalScore)
              : 0;
            commit("SET_INFO", info);
          }
          resolve(res.data);
        })
        .catch(error => {
          commit("SET_TOKEN", "");
          removeToken();
          resetRouter(routes);
          routerOther().push(`/login`);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    commit("SET_TOKEN", "");
    removeToken();
    resetRouter(routes);
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
