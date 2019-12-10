<template>
  <div class="q-px-lg q-pb-md">
    <van-list
      v-if="list.length !== 0"
      v-model="loading"
      :finished="finished"
      finished-text="已经到底了..."
      loading-text=""
      :offset="30"
      @load="onLoad"
    >
      <q-timeline style="margin-top:20px;" :layout="layout" color="secondary">
        <q-timeline-entry
          v-for="(item, index) in list.slice(0, number)"
          :key="index"
          :title="item.task.taskName"
          :subtitle="$options.filters.prettyDate(item.time)"
          side="left"
        >
          <div>
            <p v-if="item.action === 0">
              因提交任务获得 <span class="main">{{ item.score }}</span> 分
            </p>
            <p v-else>
              获得的积分被<span class="main"> {{ item.name }} </span>改为
              <span class="main">{{ item.score }}</span> 分
            </p>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </van-list>
    <div
      v-else
      class="flex-center"
      style="flex-direction:column;margin-top:200px;"
    >
      <p>
        <img src="~assets/svgs/sad.svg" style="width:50px;max-width:150px;" />
      </p>
      <span class="text-h5">没有记录</span>
    </div>
  </div>
</template>

<script>
import { List as VanList } from "vant";
export default {
  name: "home",
  components: {
    VanList
  },
  data() {
    return {
      data: [],
      list: [],
      number: 10,
      loading: false,
      finished: false
    };
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .get(`/v1/usertask/user/${this.$route.params.id}/`)
      .then(res => {
        if (res.status === 200) {
          this.data = res.data;
          this.this = [];
          this.data.forEach(item => {
            if (item.auditDate) {
              this.list.push({
                time: item.auditDate,
                action: 1,
                task: item.task,
                score: item.taskScore,
                name: item.auditUser.nickName
              });
            }
            this.list.push({
              time: item.finishedDate,
              action: 0,
              task: item.task,
              score: item.task.taskScore
            });
          });
          this.list.sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          );
          this.$store.commit("app/openLoading", false);
        }
      })
      .catch(() => {
        this.$message.error("请求出错,请检查网络或刷新重试！");
      });
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.number < this.list.length) {
          this.number += 10;
        }
        this.loading = false;
        if (this.number >= this.list.length) {
          this.finished = true;
        }
      }, 1000);
    }
  },
  computed: {
    layout() {
      return this.$q.screen.lt.sm
        ? "dense"
        : this.$q.screen.lt.md
        ? "comfortable"
        : "loose";
    }
  }
};
</script>
