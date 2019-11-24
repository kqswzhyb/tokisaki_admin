<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="flex-between" style="margin-bottom:20px;">
      <span class="text-h6">短期任务</span>
      <span class="text-h6" @click="$router.push('/notices?type=0')">更多</span>
    </div>
    <q-card class="my-card" style="margin-bottom:30px;">
      <q-card-section
        v-if="shorts.length !== 0"
        @click="$router.push(`/notice/${shorts[0].id}`)"
        style="position:relative;"
      >
        <img
          src="~assets/svgs/working.svg"
          style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
        />
        <div class="text-h6" style="color:#505050;">
          {{ shorts[0].taskName }}
        </div>
        <div class="text-subtitle2" style="color:#808080;">
          by <span class="main">{{ shorts[0].createUser.username }}</span>
          {{ shorts[0].startDate | prettyDate }}
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class="q-pa-md text-center">暂无正在进行中的任务....</div>
      </q-card-section>
    </q-card>
    <div class="text-center flex-between" style="margin-bottom:20px;">
      <div class="tag">
        <div class="flex-between">
          <q-icon name="star" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">1000</span>
        </div>
        <div style="color:#fff;" class="text-h5">总积分</div>
      </div>
      <div class="tag" style="background-color:#e66457;">
        <div class="flex-between">
          <q-icon name="emoji_events" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">3/344</span>
        </div>
        <div style="color:#fff;" class="text-h5">总排名</div>
      </div>
    </div>
    <div class="text-center flex-between" style="margin-bottom:20px;">
      <div class="tag" style="background-color:#21BA45;">
        <div class="flex-between">
          <q-icon name="event_note" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">3/444</span>
        </div>
        <div style="color:#fff;" class="text-h5">周排名</div>
      </div>
      <div class="tag" style="background-color:#26A69A;">
        <div class="flex-between">
          <q-icon name="update" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">3/344</span>
        </div>
        <div style="color:#fff;" class="text-h5">月排名</div>
      </div>
    </div>
    <div>
      <div class="flex-between" style="margin-bottom:20px;">
        <span class="text-h6">长期任务</span>
        <span class="text-h6" @click="$router.push('/notices?type=1')"
          >更多</span
        >
      </div>
      <q-card class="my-card" style="margin-bottom:30px;">
        <q-card-section
          v-if="longs.length !== 0"
          @click="$router.push(`/notice/${longs[0].id}`)"
          style="position:relative;"
        >
          <img
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <div class="text-h6" style="color:#505050;">
            {{ longs[0].taskName }}
          </div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">{{ longs[0].createUser.username }}</span>
            {{ longs[0].startDate | prettyDate }}
          </div>
        </q-card-section>
        <q-card-section v-else>
          <div class="q-pa-md text-center">暂无正在进行中的任务....</div>
        </q-card-section>
      </q-card>
    </div>
    <div>
      <div class="flex-between" style="margin-bottom:20px;">
        <span class="text-h6">积分奖励</span>
      </div>
      <q-card class="my-card" style="margin-bottom:30px;">
        <q-card-section
          @click="$router.push('/reward')"
          style="position:relative;"
        >
          <img
            src="~assets/svgs/working.svg"
            style="width:40px;height:40px;position:absolute;right:10px;top:10px;"
          />
          <div class="text-h6" style="color:#505050;">
            积分奖励一览
          </div>
          <div class="text-subtitle2" style="color:#808080;">
            by <span class="main">玄机妙算</span>
            2019年10月21日 22:00:00
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "home",
  data() {
    return {
      currentDate: new Date(),
      shorts: [],
      longs: []
    };
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .get("/v1/task")
      .then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            if (item.taskType === "ShortTerm") {
              this.shorts.push(item);
            } else {
              this.longs.push(item);
            }
          });
          this.shorts.sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          this.shorts = this.shorts.filter(
            item =>
              new Date(item.endDate).getTime() > this.currentDate.getTime()
          );
          this.longs.sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          this.longs = this.longs.filter(
            item =>
              new Date(item.endDate).getTime() > this.currentDate.getTime()
          );
          this.$store.commit("app/openLoading", false);
        }
      })
      .catch(() => {
        Toast({
          message: "请求出错,请检查网络或刷新重试！",
          duration: 0
        });
      });
  },
  methods: {}
};
</script>
