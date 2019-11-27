<template>
  <div class="q-pa-md" style="width: 100%;">
    <div
      class="row"
      style="width: 100%;justify-content:center; margin-bottom:20px;"
    >
      <q-tabs
        v-model="time"
        dense
        class="text-grey"
        style="width:100%;"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="week" label="周排行" />
        <q-tab name="month" label="月排行" />
        <q-tab name="total" label="总排行" />
      </q-tabs>
    </div>
    <div style="margin-bottom:20px;" v-if="time === 'week' || time === 'month'">
      <div class="text-weight-medium" style="margin-bottom:5px;">
        起始时间: {{ showTime.start | prettyDate }}
      </div>
      <div class="text-weight-medium">
        终止时间: {{ showTime.end | prettyDate }}
      </div>
    </div>

    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="one" label="组内排行" />
        <q-tab name="all" label="群内排行" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-list padding class="rounded-borders" style="width:100%;">
            <q-item clickable v-ripple>
              <q-item-section avatar top style="position:relative;">
                <q-avatar>
                  <img
                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                    style="width:40px;height:40px;"
                  />
                </q-avatar>
                <img
                  src="~assets/svgs/guanjun.svg"
                  style="position:absolute;left:-10px;;top:-10px;width:25px;height:25px;"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">name</q-item-label>
                <q-item-label caption>02001</q-item-label>
              </q-item-section>

              <q-item-section side>
                <span class="text-weight-medium main">10</span>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top style="position:relative;">
                <q-avatar>
                  <img
                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                    style="width:40px;height:40px;"
                  />
                </q-avatar>
                <img
                  src="~assets/svgs/yajun.svg"
                  style="position:absolute;left:-10px;;top:-10px;width:25px;height:25px;"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">name2</q-item-label>
                <q-item-label caption>02002</q-item-label>
              </q-item-section>

              <q-item-section side>
                <span class="text-weight-medium main">9</span>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top style="position:relative;">
                <q-avatar>
                  <img
                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                    style="width:40px;height:40px;"
                  />
                </q-avatar>
                <img
                  src="~assets/svgs/jijun.svg"
                  style="position:absolute;left:-10px;;top:-10px;width:25px;height:25px;"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">name3</q-item-label>
                <q-item-label caption>02003</q-item-label>
              </q-item-section>

              <q-item-section side>
                <span class="text-weight-medium main">7</span>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar top style="position:relative;">
                <q-avatar>
                  <img
                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                    style="width:40px;height:40px;"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">name4</q-item-label>
                <q-item-label caption>02004</q-item-label>
              </q-item-section>

              <q-item-section side>
                <span class="text-weight-medium main">6</span>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar top style="position:relative;">
                <q-avatar>
                  <img
                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                    style="width:40px;height:40px;"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">name5</q-item-label>
                <q-item-label caption>02005</q-item-label>
              </q-item-section>

              <q-item-section side>
                <span class="text-weight-medium main">6</span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="all">
          <q-list padding class="rounded-borders" style="width:100%;">
            <van-list
              v-model="allLoading"
              :finished="allFinished"
              finished-text="已经到底了..."
              loading-text=""
              :offset="30"
              @load="onLoad('allNumber', 'allLoading', 'allFinished', 'all')"
            >
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in all.slice(0, allNumber)"
                :key="index"
                @click="goCenter(item.id)"
              >
                <q-item-section avatar top style="position:relative;">
                  <q-avatar>
                    <img
                      src="https://cdn.quasar.dev/img/avatar2.jpg"
                      style="width:40px;height:40px;"
                    />
                  </q-avatar>
                  <!-- <img
                  :src="
                    `~assets/svgs/${
                      index === 0 ? 'guanjun' : index === 1 ? 'yajun' : 'jijun'
                    }.svg`
                  "
                  v-if="index >= 2"
                  style="position:absolute;left:-10px;;top:-10px;width:25px;height:25px;"
                /> -->
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{ item.nickName }}</q-item-label>
                  <q-item-label caption>{{ item.userCode }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <span class="text-weight-medium main">{{
                    item.totalScore
                  }}</span>
                </q-item-section>
              </q-item>
            </van-list>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { List as VanList } from "vant";
export default {
  components: {
    VanList
  },
  name: "intervalRank",
  data() {
    return {
      tasks: [],
      task: "",
      time: "week",
      tab: "all",

      weekTime: {},
      monthTime: {},
      showTime: {},

      weekRankAll: [],
      monthRankAll: [],
      totalRankAll: [],
      all: [],
      one: [],

      allNumber: 10,
      allLoading: false,
      allFinished: false
    };
  },
  watch: {
    time: {
      handler: function(val) {
        switch (val) {
          case "week":
            this.showTime = Object.assign({}, this.weekTime);
            this.all = JSON.parse(JSON.stringify(this.weekRankAll));
            break;
          case "month":
            this.showTime = Object.assign({}, this.monthTime);
            this.all = JSON.parse(JSON.stringify(this.monthRankAll));
            break;
          case "total":
            this.all = JSON.parse(JSON.stringify(this.totalRankAll));
            break;
        }
        this.initData();
      }
    }
  },
  created() {
    this.$store.commit("app/openLoading", true);
    this.$axios
      .get("/v1/rank/groupRank")
      .then(res => {
        if (res.status === 200) {
          this.weekTime = { start: res.data.weekStart, end: res.data.weekEnd };
          this.weekRankAll = res.data.weekList;
          this.monthTime = {
            start: res.data.monthStart,
            end: res.data.monthEnd
          };
          this.all = JSON.parse(JSON.stringify(this.weekRankAll));
          this.showTime = Object.assign({}, this.weekTime);
          this.monthRankAll = res.data.monthList;
          this.totalRankAll = res.data.allList;
          this.$store.commit("app/openLoading", false);
        }
      })
      .catch(() => {
        this.$message.error("请求出错,请检查网络或刷新重试！");
      });
  },
  methods: {
    onLoad(number, loading, finished, data) {
      setTimeout(() => {
        if (this[number] < this[data].length) {
          this[number] += 10;
        }
        this[loading] = false;
        if (this[number] >= this[data].length) {
          this[finished] = true;
        }
      }, 1000);
    },
    initData() {
      this.allNumber = 10;
      this.allLoading = false;
      this.allFinished = false;
    },
    goCenter(id) {
      if (this.$store.state.user.info.roles.length >= 2) {
        this.$router.push(`/user/center/${id}`);
      }
    }
  }
};
</script>
