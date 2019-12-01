<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="q-mb-xl q-mt-xl text-h5 main text-center">
      <span>注册</span>
    </div>
    <q-form class="q-gutter-md" @submit="onSubmit" ref="form">
      <q-input
        class="main"
        v-model="form.username"
        label="QQ号（用作帐号）"
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
          <q-icon name="img:statics/icons/invite.svg" style="font-size:24px;" />
        </template>
      </q-input>
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
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" @click="register" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Button as VanButton, Toast } from "vant";
// import { setToken } from "../../utils/auth";
export default {
  components: {
    VanButton
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
        inviteCode: ""
      },
      groupName: "",
      visible: false
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
          if (this.form.id) {
            this.disabled = true;
            this.$axios
              .get(`/auth/groupcode?code=${this.form.inviteCode}`)
              .then(res => {
                if (res.status === 200) {
                  this.groupName = res.data.groupname;
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
            id: this.form.id
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        );
        console.log(res.data);
        // if (res.status !== 200) {
        //   this.$message.error('帐号或密码错误')
        //   this.loading = false
        // } else {
        //   this.$store.commit('user/SET_TOKEN', res.data.token)
        //   setToken(res.data.token)
        //   this.$router.push({ path: this.redirect || '/' })
        //   this.loading = false
        // }
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
