const state = {
  loading: false
};

const mutations = {
  openLoading: (state, status) => {
    state.loading = status;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
