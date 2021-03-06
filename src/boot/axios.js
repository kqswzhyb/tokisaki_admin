import Vue from "vue";
import axios from "axios";
import { getToken } from "../utils/auth";
// import "@vant/touch-emulator";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import { PullRefresh } from "vant";

Vue.use(PullRefresh);

dayjs.locale("zh-cn");
dayjs.extend(utc);

Vue.filter("prettyDate", dateString => {
  const date = dayjs
    .utc(dateString)
    .local()
    .format("YYYY年MM月DD日 HH:mm:ss");
  return date;
});
const noToken = ["/auth/signin"];
axios.interceptors.request.use(config => {
  if (!noToken.includes(config.url.substring(0, 25))) {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  return config;
});
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://www.kurumiqq.com/api";
Vue.prototype.$axios = axios;
Vue.prototype.$baseURL =
  "https://tokisaki-admin-1257494597.cos.ap-shanghai.myqcloud.com";
