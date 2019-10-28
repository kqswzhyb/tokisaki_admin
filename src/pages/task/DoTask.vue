<template>
  <div class="q-pa-md">
    <div style="margin-bottom:20px;">
      当前任务：<span class="text-h6 main" @click="$router.push('/notice/2')"
        >众筹</span
      >
    </div>
    <q-input outlined type="textarea" v-model="form.text" label="内容" />
    <van-uploader style="margin:20px 0;" v-model="form.images" multiple />
    <q-btn
      label="提交"
      style="width:100%;"
      size="md"
      color="secondary"
      rounded
      v-close-popup
    />
  </div>
</template>

<script>
import { Uploader as VanUploader } from "vant";
export default {
  name: "doTask",
  data: function() {
    return {
      form: {
        text: ""
      }
    };
  },
  components: {
    VanUploader
  }
};
</script>
