<template>
  <div class="q-pa-md" ref="div">
    <div
      style="padding:0 20px;margin-top:20px;"
      v-for="item in lists"
      :key="item.time"
    >
      <div class="flex-center">
        <span class="time-box">{{ item.time }}</span>
      </div>
      <div style="margin-top:20px;">
        <span class="message-box" v-html="ReplaceUrl(item.text, item.url)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messages",
  data() {
    return {
      lists: [
        {
          time: "2019年10月21日 22:20",
          text: "你已被提升为组长，恭喜！你已被提升为组长，恭喜！"
        },
        {
          time: "2019年10月21日 22:22",
          text: "你已被降为组员！"
        },
        {
          time: "2019年10月21日 22:23",
          text: "管理员发布了新的任务。",
          url: "/notice/2"
        },
        {
          time: "2019年10月21日 22:24",
          text: "你已被降为组员！"
        },
        {
          time: "2019年10月21日 22:25",
          text: "你已被提升为组长，恭喜！你已被提升为组长，恭喜！"
        },
        {
          time: "2019年10月21日 22:26",
          text: "你已被降为组员！"
        },
        {
          time: "2019年10月21日 22:27",
          text: "你已被降为组员！"
        }
      ]
    };
  },
  methods: {
    ReplaceUrl(text, url) {
      if (url) {
        return (
          text +
          '<a href="/#' +
          url +
          '" style="text-decoration: underline;color: #00c;">' +
          "查看详情" +
          "</a>"
        );
      }
      return text;
    }
  }
};
</script>
