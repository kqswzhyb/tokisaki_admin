<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="q-mb-xl q-mt-xl text-h5 main text-center">
      <span>群组管理系统</span>
    </div>
    <q-form class="q-gutter-md" @submit="onSubmit" ref="form">
      <q-input
        class="main"
        v-model="form.username"
        label="用户名"
        :rules="[val => (val && val.length > 0) || '请输入用户名']"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        class="main"
        v-model="form.password"
        type="password"
        label="密码"
        :rules="[val => (val && val.length > 0) || '请输入密码']"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-checkbox
        dense
        v-model="remain"
        label="记住密码"
        :style="{ color: remain ? '#e66457' : '#666' }"
      />
      <div class="row justify-between items-start">
        <q-input
          class="main"
          v-model="form.captcha"
          style="width:40vw"
          label="验证码"
          :rules="[val => (val && val.length > 0) || '请输入验证码']"
        >
        </q-input>
        <img :src="img" style="width:45vw" alt="" @click="getCaptcha" />
      </div>
      <div style="width:100%;">
        <van-button
          style="width:95%;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
          :loading="loading"
          :disabled="loading"
          type="submit"
          loading-text="正在登录..."
          >登录</van-button
        >
      </div>
    </q-form>
    <div class="text-right q-mt-md">
      <img
        width="112"
        style="cursor:pointer;"
        src="~/assets/qq_login.png"
        @click="goQQ"
      />
    </div>
  </div>
</template>

<script>
import { Button as VanButton, Toast } from "vant";
import { setToken } from "../../utils/auth";
export default {
  components: {
    VanButton
  },
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
        captcha: ""
      },
      img: "",
      remain: true
    };
  },
  created() {
    if (localStorage.getItem("remain") === "true") {
      this.form.username = localStorage.getItem("username");
      this.form.password = localStorage.getItem("password");
    }
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      this.$axios
        .get("/auth/getcaptcha", {
          responseType: "arraybuffer"
        })
        .then(res => {
          this.img =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
        })
        .catch(() => {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 5000
          });
        });
    },
    async onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
          this.loading = true;
          try {
            const res = await this.$axios.post(
              "/auth/signin",
              {
                username: this.form.username,
                password: this.form.password,
                code: this.form.captcha
              },
              {
                headers: {
                  "Content-Type": "application/json; charset=UTF-8"
                }
              }
            );
            if (res.status !== 200) {
              Toast({
                message: "密码或验证码错误"
              });
              this.getCaptcha();
              this.form.captcha = "";
              this.loading = false;
            } else {
              if (res.data.status === "frozen") {
                Toast({
                  message: "该帐号已被冻结"
                });
              }
              if (res.data.token) {
                if (this.remain) {
                  localStorage.setItem("remain", "true");
                  localStorage.setItem("username", this.form.username);
                  localStorage.setItem("password", this.form.password);
                } else {
                  localStorage.setItem("remain", "false");
                  localStorage.setItem("username", "");
                  localStorage.setItem("password", "");
                }
                Toast.success("登录成功");
                this.$store.commit("user/SET_TOKEN", res.data.token);
                setToken(res.data.token);
                this.$router.push({ path: "/home" });
              } else {
                Toast({
                  message: "密码或验证码错误"
                });
                this.getCaptcha();
                this.form.captcha = "";
              }
              this.loading = false;
            }
          } catch {
            Toast({
              message: "请求出错,请检查网络或刷新重试！",
              duration: 5000
            });
            this.loading = false;
          }
        }
      });
    },
    goQQ() {
      this.$axios
        .get("/auth/qqlogin")
        .then(res => {
          if (res.status === 200) {
            window.location.href = res.data.url;
          } else {
            this.$router.push("/404");
          }
        })
        .catch(() => {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 5000
          });
        });
    }
  }
};
</script>

<style></style>
