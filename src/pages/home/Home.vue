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
          <span style="color:#fff;" class="text-h5">{{
            $store.state.user.info.user.totalScore
          }}</span>
        </div>
        <div style="color:#fff;" class="text-h5">总积分</div>
      </div>
      <div
        class="tag"
        style="background-color:#e66457;"
        @click="$router.push('/rank/interval?type=total')"
      >
        <div class="flex-between">
          <q-icon name="emoji_events" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">{{ rank.total }}</span>
        </div>
        <div style="color:#fff;" class="text-h5">总排名</div>
      </div>
    </div>
    <div class="text-center flex-between" style="margin-bottom:20px;">
      <div
        class="tag"
        style="background-color:#21BA45;"
        @click="$router.push('/rank/interval?type=week')"
      >
        <div class="flex-between">
          <q-icon name="event_note" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">{{ rank.week }}</span>
        </div>
        <div style="color:#fff;" class="text-h5">周排名</div>
      </div>
      <div
        class="tag"
        style="background-color:#26A69A;"
        @click="$router.push('/rank/interval?type=month')"
      >
        <div class="flex-between">
          <q-icon name="update" size="lg" color="white" />
          <span style="color:#fff;" class="text-h5">{{ rank.month }}</span>
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
            <p
              style="font-size:14px;color:#666;line-height:20px;margin-top:15px;"
            >
              达到积分节点请联系时光，QQ：2507321376
            </p>
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
      longs: [],
      rank: {}
    };
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .all([this.$axios.get(`/v1/task`), this.$axios.get("/v1/rank/groupRank")])
      .then(
        this.$axios.spread((res, res2) => {
          if (res.status === 200 && res2.status === 200) {
            res.data.forEach(item => {
              if (item.taskType === "ShortTerm") {
                this.shorts.push(item);
              } else {
                this.longs.push(item);
              }
            });
            const id = this.$store.state.user.info.user.id;
            this.rank = {
              week: res2.data.weekList
                ? `${
                    res2.data.weekList
                      ? res2.data.weekList.findIndex(item => item.id === id)
                      : -1 + 1
                  } / ${res2.data.weekList ? res2.data.weekList.length : 0}`
                : "0 / 0",
              month: res2.data.monthList
                ? `${
                    res2.data.monthList
                      ? res2.data.monthList.findIndex(item => item.id === id)
                      : -1 + 1
                  } / ${res2.data.monthList ? res2.data.monthList.length : 0}`
                : "0 / 0",
              total: `${
                res2.data.allList
                  ? res2.data.allList.findIndex(item => item.id === id)
                  : -1 + 1
              } / ${res2.data.allList ? res2.data.allList.length : 0}`
            };
            this.shorts.sort(
              (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
            );
            this.shorts = this.shorts.filter(
              item =>
                new Date(item.endDate).getTime() > this.currentDate.getTime()
            );
            this.longs.sort(
              (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
            );
            this.longs = this.longs.filter(
              item =>
                new Date(item.endDate).getTime() > this.currentDate.getTime()
            );
            this.$store.commit("app/openLoading", false);
          } else {
            this.$store.commit("app/openLoading", false);
            this.$router.push("/404");
          }
        })
      )
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
