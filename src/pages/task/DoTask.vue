<template>
  <div class="q-pa-md">
    <div style="margin-bottom:20px;">
      当前任务：<span class="text-h6 main" @click="$router.push('/notice/2')"
        >众筹</span
      >
    </div>
    <q-input outlined type="textarea" v-model="form.text" label="内容" />
    <q-uploader
      url="http://localhost:4444/upload"
      style="width:100%;margin:30px 0;"
      ref="uploader"
      dark
      multiple
      accept="image/*"
      :max-file-size="1024 * 1024"
    />
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
export default {
  name: "doTask",
  data: function() {
    return {
      form: {
        text: ""
      }
    };
  }
};
</script>
