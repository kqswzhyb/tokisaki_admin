<template>
  <div class="q-pa-md" style="width: 100%;">
    <div v-show="!loading2">
      <div class="q-mb-xl q-mt-xl text-h5 main text-center">
        <span>注册</span>
      </div>
      <q-form class="q-gutter-md" @submit="onSubmit" ref="form">
        <q-input
          class="main"
          v-model="form.username"
          label="QQ号码(用作帐号——重要！！！)"
          :rules="[
            val => (val && /^[0-9]+$/gi.test(val)) || '请输入你在群中的QQ号码'
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
                val.length >= 6 &&
                /^[\u4e00-\u9fa5A-Za-z0-9]+$/gi.test(val)) ||
              '请输入至少6位字母和数字'
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
            <q-icon
              name="img:statics/icons/invite.svg"
              style="font-size:24px;"
            />
          </template>
        </q-input>
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
            :disabled="disabled"
            style="width:95%;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
            type="submit"
            >注册</van-button
          >
        </div>
      </q-form>
      <q-dialog v-model="visible" width="300px" @hide="hide">
        <q-card style="width: 80vw;max-width:300px;">
          <q-card-section>
            <div class="text-h6">提示</div>
          </q-card-section>

          <q-card-section v-if="groupName">
            注册成功后将自动加入{{ groupName }},您确定吗？
          </q-card-section>

          <q-card-section v-else>
            邀请码不存在
          </q-card-section>
          <q-card-actions align="right">
            <van-button
              style="width:80px;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
              :loading="loading"
              :disabled="loading"
              loading-text="正在注册"
              round
              @click="register"
              >确定</van-button
            >
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <Loading v-show="loading2" />
  </div>
</template>

<script>
import { Button as VanButton, Toast } from "vant";
import Loading from "../Loading";
import { setToken } from "../../utils/auth";
export default {
  components: {
    VanButton,
    Loading
  },
  data() {
    return {
      disabled: false,
      loading: false,
      form: {
        id: "",
        username: "",
        password: "",
        confirmPassword: "",
        inviteCode: "",
        captcha: ""
      },
      groupName: "",
      visible: false,
      img: ""
    };
  },
  computed: {
    loading2() {
      return this.$store.state.app.loading;
    }
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .get(
        `/auth/qqloginCallback?code=${this.$route.query.code}&state=${
          this.$route.query.state
        }`
      )
      .then(res => {
        if (res.status === 200) {
          if (res.data.status === "frozen") {
            Toast({
              message: "该帐号已被冻结"
            });
            this.$store.commit("app/openLoading", false);
            this.$router.push("/home");
            return;
          }
          if (!res.data) {
            Toast("请先通过QQ授权再注册");
            this.$store.commit("app/openLoading", false);
            this.$router.push("/home");
            return;
          }
          if (res.data.token) {
            Toast.success("登录成功");
            this.$store.commit("user/SET_TOKEN", res.data.token);
            setToken(res.data.token);
            this.$router.push({ path: this.redirect || "/" });
          } else {
            this.form.id = res.data.id;
            this.getCaptcha();
            this.$store.commit("app/openLoading", false);
          }
        }
      });
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
            duration: 0
          });
        });
    },
    async onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
          if (this.form.id) {
            this.disabled = true;
            this.$axios
              .get(`/auth/groupcode?code=${this.form.inviteCode}`)
              .then(res => {
                if (res.status === 200) {
                  this.groupName = res.data.groupName;
                  this.visible = true;
                } else {
                  Toast("此邀请码不存在");
                  this.groupName = "";
                  this.visible = false;
                  this.disabled = false;
                }
              });
          } else {
            Toast("请先通过QQ授权再注册");
          }
        }
      });
    },
    hide() {
      this.disabled = false;
      this.loading = false;
    },
    async register() {
      this.loading = true;
      try {
        const res = await this.$axios.post(
          "/auth/qqbind",
          {
            username: this.form.username,
            password: this.form.password,
            groupInvite: this.form.inviteCode,
            id: this.form.id,
            code: this.form.captcha
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        );
        if (res.status !== 200) {
          Toast("邀请码或验证码错误");
          this.getCaptcha();
          this.form.captcha = "";
          this.disabled = false;
          this.loading = false;
        } else {
          if (res.data.token) {
            Toast.success("注册成功");
            this.$store.commit("user/SET_TOKEN", res.data.token);
            setToken(res.data.token);
            this.$router.push({ path: "/home" });
          } else {
            Toast({
              message: "邀请码或验证码错误"
            });
            this.getCaptcha();
            this.form.captcha = "";
          }
          this.disabled = false;
          this.loading = false;
        }
      } catch {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      }
    }
  }
};
</script>

<style></style>
