import Vue from "vue";
import App from "./App.vue";
import { initInstance as initAxiosInstance } from "@/plugins";
Vue.config.productionTip = false;
initAxiosInstance("http://localhost:3000/");
new Vue({
  render: h => h(App)
}).$mount("#app");
