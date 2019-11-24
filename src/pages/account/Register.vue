<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="q-mb-xl q-mt-xl text-h5 main text-center">
      <span>注册</span>
    </div>
    <q-form class="q-gutter-md" @submit="onSubmit" ref="form">
      <q-input
        class="main"
        v-model="form.username"
        label="用户名"
        :rules="[
          val =>
            (val &&
              val.length >= 6 &&
              /^[\u4e00-\u9fa5A-Za-z0-9]+$/gi.test(val)) ||
            '请输入至少6位汉字和英文字母和数字'
        ]"
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
        :rules="[
          val =>
            (val &&
              val.length === 6 &&
              /^[\u4e00-\u9fa5A-Za-z0-9]+$/gi.test(val)) ||
            '请输入6位字母和数字'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-input
        class="main"
        v-model="form.confirmPassword"
        type="password"
        label="确认密码"
        :rules="[
          val => (val && val === form.password) || '确认密码必须和密码一样'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-input
        class="main"
        v-model="form.inviteCode"
        label="邀请码"
        :rules="[
          val =>
            (val && val.length === 8 && /^[A-Za-z0-9]+$/gi.test(val)) ||
            '请输入你要加入的8位小组邀请码'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="img:statics/icons/invite.svg" style="font-size:24px;" />
        </template>
      </q-input>
      <q-input
        class="main"
        v-model="form.qqNo"
        label="QQ号码"
        :rules="[
          val => (val && /^[0-9]+$/gi.test(val)) || '请输入你在群中的QQ号码'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="img:statics/icons/qq.svg" style="font-size:24px;" />
        </template>
      </q-input>
      <div style="width:100%;">
        <van-button
          :loading="loading"
          :disabled="loading"
          loading-text="正在注册..."
          style="width:95%;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
          type="submit"
          >注册</van-button
        >
      </div>
    </q-form>
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
        confirmPassword: "",
        inviteCode: "",
        qqNo: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
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
        }
      });
    },
    goQQ() {
      window.location.href =
        "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101825291&redirect_uri=https://tokisaki.cn/qqloin&state=test";
    }
  }
};
</script>

<style></style>
