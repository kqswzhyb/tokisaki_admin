<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/svgs/sad.svg" style="width:30vw;max-width:150px;" />
    </p>
    <p class="text-faded">找不到该页面</p>
    <q-btn color="secondary" style="width:200px;" to="/home" label="返回首页" />
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>
