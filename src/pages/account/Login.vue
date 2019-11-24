<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="q-mb-xl q-mt-xl text-h5 main text-center">
      <span>群组管理系统</span>
    </div>
    <q-form class="q-gutter-md">
      <q-input class="main" v-model="form.username" label="用户名">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        class="main"
        v-model="form.password"
        type="password"
        label="密码"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <div style="width:100%;">
        <van-button
          style="width:95%;"
          :loading="loading"
          :disabled="loading"
          type="info"
          loading-text="正在登录..."
          color="#e66457"
          @click="onSubmit"
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
        username: "admin",
        password: "password"
      }
    };
  },
  methods: {
    async onSubmit() {
      if (!this.form.username || !this.form.password) {
        Toast.fail("用户名和密码不能为空");
        return;
      }
      this.loading = true;
      try {
        const res = await this.$axios.post(
          "/auth/signin",
          {
            username: this.form.username,
            password: this.form.password
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        );
        if (res.status !== 200) {
          Toast({
            message: "帐号或密码错误"
          });
          this.loading = false;
        } else {
          this.$store.commit("user/SET_TOKEN", res.data.token);
          setToken(res.data.token);
          this.$router.push({ path: "/home" });
          this.loading = false;
        }
      } catch {
        Toast({
          message: "请求出错,请检查网络或刷新重试！"
        });
        this.loading = false;
      }
    },
    goQQ() {
      window.location.href =
        "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101825291&redirect_uri=https://tokisaki.cn/qqloin&state=test";
    }
  }
};
</script>

<style></style>
