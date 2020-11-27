import userService from "../services/user.service";

const state = {
  userList: null
};
const mutations = {
  setUserList(state, payload) {
    state.userList = payload;
  }
};

const actions = {
  async getUsers({ state, commit }) {
    try {
      let results = await userService.getUsers();
      commit("setUserList", results);
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
