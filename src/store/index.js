import Vue from "vue";
import Vuex from "vuex";
import user from "./user.module";

// import router from "../../router";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  },
  state: {},
  mutations: {},
  actions: {}
});
