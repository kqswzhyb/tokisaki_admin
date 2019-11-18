<template>
  <div class="flex-center column" style="height:calc(100vh - 50px);">
    <div class="balls">
      <div />
      <div />
      <div />
    </div>
    <p class="tip">加载中...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.tip {
  font-size: 20px;
  margin-top: 50px;
  font-weight: bold;
}
.balls {
  width: 6.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  background-color: #e66457;
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
