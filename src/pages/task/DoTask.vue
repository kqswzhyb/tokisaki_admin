<template>
  <div class="q-pa-md">
    <div style="margin-bottom:20px;">
      当前任务：<span
        class="text-h6 main"
        @click="$router.push(`/notice/${$route.params.id}`)"
        >{{ $route.query.name }}</span
      >
    </div>
    <q-input outlined type="textarea" v-model="form.text" label="内容" />
    <MyUploader
      style="margin:20px 0;"
      ref="child"
      type="UserTask"
      :count="6"
      @input="getImages"
      @img="getImage"
    />
    <div class="q-ml-sm">
      <van-button
        style="width:98%;color: #fff;background-color: #e66457;border: 1px solid #e66457;"
        @click="onSubmit"
        :loading="loading"
        :disabled="loading"
        loading-text="正在提交"
        round
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast, Button as VanButton } from "vant";
import MyUploader from "../../components/Upload";
export default {
  name: "doTask",
  data: function() {
    return {
      loading: false,
      form: {
        text: "",
        images: []
      }
    };
  },
  components: {
    MyUploader,
    VanButton
  },
  methods: {
    getImage(data) {
      this.form.images = data;
    },
    async getImages(data) {
      try {
        const res = await this.$axios.post(
          `/v1/usertask/task/${this.$route.params.id}/`,
          {
            taskMemo: this.form.text,
            utAttachment: data
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        );
        if (res.status !== 201) {
          Toast({
            message: "错误",
            duration: 0
          });
          this.loading = false;
        } else {
          Toast.success("提交成功");
          this.$store.dispatch("user/getInfo");
          this.loading = false;
          setTimeout(() => {
            this.$router.push(
              `/user/commit/${this.$route.params.id}?uid=${
                this.$store.state.user.info.user.id
              }`
            );
          }, 2000);
        }
      } catch {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
        this.loading = false;
      }
    },
    onSubmit() {
      if (this.form.images.length !== 0) {
        this.loading = true;
        this.$refs.child.load();
      } else {
        Toast({
          message: "必须上传图片"
        });
        return false;
      }
    }
  }
};
</script>
