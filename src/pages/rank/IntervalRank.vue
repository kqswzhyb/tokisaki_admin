<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="row" style="width: 100%;">
      <q-select
        outlined
        v-if="$store.state.user.info.roles.length >= 3"
        v-model="group"
        :options="groups"
        :option-value="item => item.id"
        :option-label="item => item.groupName"
        label="小组组名"
        behavior="menu"
        style="width:40vw;min-width:150px;"
      />
    </div>
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
            <van-list
              v-model="oneLoading"
              :finished="oneFinished"
              finished-text="已经到底了..."
              loading-text=""
              :offset="30"
              @load="onLoad('oneNumber', 'oneLoading', 'oneFinished', 'one')"
            >
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in one.slice(0, oneNumber)"
                :key="index"
                @click="goCenter(item.id)"
                class="flex-center"
              >
                <div
                  class="rank flex-center"
                  :style="{
                    backgroundColor:
                      index === 0
                        ? '#ff9800'
                        : index === 1
                        ? '#ccc'
                        : index === 2
                        ? '#b87333'
                        : '#3c9cfe'
                  }"
                >
                  <span style="color:#fff;font-size:12px">{{ index + 1 }}</span>
                </div>
                <q-item-section avatar top>
                  <q-avatar>
                    <img
                      v-if="item.iconUrl"
                      :src="item.iconUrl"
                      width="40"
                      height="40"
                    />
                    <img
                      v-else
                      src="../../assets/default_user.jpg"
                      width="40"
                      height="40"
                    />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{ item.nickName }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <span
                    class="text-weight-medium main"
                    v-if="$store.state.user.info.roles.length >= 2"
                    >{{ item.totalScore }}</span
                  >
                </q-item-section>
              </q-item>
            </van-list>
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
                class="flex-center"
              >
                <div
                  class="rank flex-center"
                  :style="{
                    backgroundColor:
                      index === 0
                        ? '#ff9800'
                        : index === 1
                        ? '#ccc'
                        : index === 2
                        ? '#b87333'
                        : '#3c9cfe'
                  }"
                >
                  <span style="color:#fff;font-size:12px">{{ index + 1 }}</span>
                </div>
                <q-item-section avatar top>
                  <q-avatar>
                    <img
                      v-if="item.iconUrl"
                      :src="item.iconUrl"
                      width="40"
                      height="40"
                    />
                    <img
                      v-else
                      src="../../assets/default_user.jpg"
                      width="40"
                      height="40"
                    />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{ item.nickName }}</q-item-label>
                  <q-item-label
                    lines="1"
                    style="padding:0;font-size:14px;color:#505050;"
                    >{{
                      item.userGroup ? item.userGroup.groupName : "暂无小组"
                    }}</q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <span
                    class="text-weight-medium main"
                    v-if="$store.state.user.info.roles.length >= 2"
                    >{{ item.totalScore }}</span
                  >
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
      allFinished: false,

      group: {},
      groups: [],

      oneNumber: 10,
      oneLoading: false,
      oneFinished: false,

      oneWeek: [],
      oneTotal: [],
      oneMonth: []
    };
  },
  watch: {
    time: {
      handler: function(val) {
        this.initData();
        switch (val) {
          case "week":
            this.showTime = Object.assign({}, this.weekTime);
            this.all = JSON.parse(JSON.stringify(this.weekRankAll));
            this.one = JSON.parse(JSON.stringify(this.oneWeek));
            break;
          case "month":
            this.showTime = Object.assign({}, this.monthTime);
            this.all = JSON.parse(JSON.stringify(this.monthRankAll));
            this.one = JSON.parse(JSON.stringify(this.oneMonth));
            break;
          case "total":
            this.all = JSON.parse(JSON.stringify(this.totalRankAll));
            this.one = JSON.parse(JSON.stringify(this.oneTotal));
            break;
        }
      }
    },
    group: {
      handler: function(val) {
        this.$store.commit("app/openLoading", true);
        this.initData();
        this.$axios
          .get(`/v1/rank/groupRank/${val.id}`)
          .then(res => {
            if (res.status === 200) {
              if (res.data.groupList) {
                this.oneTotal = res.data.groupList;
              } else {
                this.oneTotal = [];
              }
              if (res.data.groupWeekList) {
                this.oneWeek = res.data.groupWeekList;
              } else {
                this.oneWeek = [];
              }
              if (res.data.groupMonthList) {
                this.oneMonth = res.data.groupMonthList;
              } else {
                this.oneMonth = [];
              }
              switch (this.time) {
                case "week":
                  this.one = JSON.parse(JSON.stringify(this.oneWeek));
                  break;
                case "month":
                  this.one = JSON.parse(JSON.stringify(this.oneMonth));
                  break;
                case "total":
                  this.one = JSON.parse(JSON.stringify(this.oneTotal));
                  break;
              }
              this.$store.commit("app/openLoading", false);
            } else {
              this.$store.commit("app/openLoading", false);
              this.$router.push("/404");
            }
          })
          .catch(() => {
            this.$message.error("请求出错,请检查网络或刷新重试！");
          });
      },
      deep: true
    }
  },
  async created() {
    this.$store.commit("app/openLoading", true);
    try {
      const result = await this.$axios.get("/v1/usergroup/listall");
      if (result.status === 200) {
        this.groups = result.data;
      } else {
        this.$router.push("/404");
      }
    } catch (err) {
      this.$message.error("请求出错,请检查网络或刷新重试！");
    }
    if (this.$store.state.user.info.user.userGroup) {
      this.group = {
        id: this.$store.state.user.info.user.userGroup.id,
        groupName: this.$store.state.user.info.user.userGroup.groupName
      };
    } else {
      this.group = {
        id: this.groups[0].id,
        groupName: this.groups[0].groupName
      };
    }
    this.$axios
      .all([
        this.$axios.get(`/v1/rank/groupRank`),
        this.$axios.get(`/v1/rank/groupRank/${this.group.id}`)
      ])
      .then(
        this.$axios.spread((res, res2) => {
          if (res.status === 200 && res2.status === 200) {
            this.weekTime = {
              start: res.data.weekStart,
              end: res.data.weekEnd
            };
            if (res.data.weekList) {
              this.weekRankAll = res.data.weekList;
            }
            this.monthTime = {
              start: res.data.monthStart,
              end: res.data.monthEnd
            };
            this.all = JSON.parse(JSON.stringify(this.weekRankAll));
            this.showTime = Object.assign({}, this.weekTime);
            if (res.data.monthList) {
              this.monthRankAll = res.data.monthList;
            }
            this.totalRankAll = res.data.allList;
            if (res2.data.groupWeekList) {
              this.oneWeek = res2.data.groupWeekList;
            }
            if (res2.data.groupList) {
              this.oneTotal = res2.data.groupList;
            }
            if (res2.data.groupMonthList) {
              this.oneMonth = res2.data.groupMonthList;
            }
            this.one = JSON.parse(JSON.stringify(this.oneWeek));
            switch (this.$route.query.type) {
              case "week":
                this.time = "week";
                break;
              case "month":
                this.time = "month";
                break;
              case "total":
                this.time = "total";
                break;
            }
            this.$store.commit("app/openLoading", false);
          }
        })
      )
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
      this.oneNumber = 10;
      this.oneLoading = false;
      this.oneFinished = false;
    },
    goCenter(id) {
      if (this.$store.state.user.info.roles.length >= 2) {
        this.$router.push(`/user/center/${id}`);
      }
    }
  }
};
</script>
