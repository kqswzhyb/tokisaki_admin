<template>
  <div class="flex-center" style="height:calc(100vh - 50px);">
    <van-loading type="spinner" color="#000" size="66px" vertical
      ><span style="font-size:24px;">加载中...</span></van-loading
    >
  </div>
</template>

<script>
import { Loading as VanLoading } from "vant";
export default {
  components: {
    VanLoading
  },
  data() {
    return {};
  }
};
</script>

<style></style>
