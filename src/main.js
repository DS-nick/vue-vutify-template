import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "../src/store";
import ApiService from "./services/api.service";

Vue.config.productionTip = false;

ApiService.init(process.env.VUE_APP_ROOT_API);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
