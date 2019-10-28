import Vue from "vue";
import axios from "axios";
import "@vant/touch-emulator";
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
