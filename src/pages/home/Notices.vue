<template>
  <div class="q-pa-md" style="width: 100%;">
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="0"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <q-card
        v-for="item in tasks.slice(0, offset)"
        :key="item.id"
        style="margin-bottom:30px;"
      >
        <q-card-section
          @click="$router.push(`/notice/${item.id}`)"
          style="position:relative;"
        >
          <img
            v-if="new Date(item.endDate).getTime() > currentDate.getTime()"
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <img
            v-else
            src="~assets/svgs/finish.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <div class="text-h6" style="color:#505050;">
            {{ item.taskName }}
          </div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">{{ item.createUser.username }}</span>
            {{ item.startDate | prettyDate }}
          </div>
        </q-card-section>
      </q-card>
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
import { List as VanList } from "vant";
export default {
  name: "notices",
  components: {
    VanList
  },
  data() {
    return {
      currentDate: new Date(),
      tasks: [],
      loading: false,
      finished: false,
      offset: 10
    };
  },
  async created() {
    this.$store.commit("app/openLoading", true);
    let types = [0, 1, 2];
    if (!types.includes(Number(this.$route.query.type))) {
      this.$router.push("/404");
    }
    switch (Number(this.$route.query.type)) {
      case 0:
        try {
          let res = await this.$axios.get(
            "/v1/task/search/?taskType=ShortTerm"
          );
          this.tasks = res.data;
        } catch (err) {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 0
          });
        }
        break;
      case 1:
        try {
          let res = await this.$axios.get("/v1/task/search/?taskType=LongTerm");
          this.tasks = res.data;
        } catch (err) {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 0
          });
        }
        break;
    }
    this.tasks.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
    let working = this.tasks.filter(
      item => new Date(item.endDate).getTime() > this.currentDate.getTime()
    );
    let finish = this.tasks.filter(
      item => new Date(item.endDate).getTime() < this.currentDate.getTime()
    );
    this.tasks = working.concat(finish);
    this.$store.commit("app/openLoading", false);
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.offset < this.tasks.length) {
          this.offset += 10;
        }
        this.loading = false;
        if (this.offset >= this.tasks.length) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>
