<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="row" style="width: 100%;justify-content:space-between;">
      <q-input
        filled
        v-model="date"
        label="任务日期"
        style="width: 44vw;margin-top:20px;"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
                :options="dates"
                :locale="myLocale"
                @input="() => $refs.qDateProxy.hide()"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select
        filled
        v-model="value"
        :option-value="item => item.id"
        :option-label="item => item.taskName"
        :options="options"
        style="width: 44vw;"
        behavior="menu"
      />
    </div>
    <div class="q-mb-md">
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
    <div style="margin-bottom:20px;">
      <div class="text-weight-medium" style="margin-bottom:5px;">
        本次任务起始时间: {{ value.startDate | prettyDate }}
      </div>
      <div class="text-weight-medium">
        本次任务终止时间: {{ value.endDate | prettyDate }}
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
        <q-tab
          name="group"
          label="小组排行"
          v-if="$store.state.user.info.roles.length >= 3"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <RankList ref="one" :ranks="one" />
        </q-tab-panel>

        <q-tab-panel name="all">
          <RankList ref="all" :ranks="all" />
        </q-tab-panel>

        <q-tab-panel
          name="group"
          v-if="$store.state.user.info.roles.length >= 3"
        >
          <RankGroup ref="group" :ranks="groupRank" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import RankList from "../../components/RankList";
import RankGroup from "../../components/RankGroup";
import { Toast } from "vant";
import dayjs from "dayjs";
export default {
  name: "shortRank",
  components: {
    RankList,
    RankGroup
  },
  data() {
    return {
      tasks: {},
      date: "",
      dates: [],
      value: {},
      options: [],
      data: [],
      id: "",
      myLocale: {
        /* starting with Sunday */
        days: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        daysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split(
          "_"
        ),
        firstDayOfWeek: 1
      },
      tab: "all",
      all: [],
      one: [],
      groupRank: [],

      group: {},
      timer: ""
    };
  },
  computed: {
    groups() {
      return this.$store.state.group.groups;
    },
    shorts() {
      return this.$store.state.task.shorts;
    }
  },
  props: {
    update: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    date: {
      handler: function(val) {
        if (this.dates.find(item => item === val)) {
          this.options = this.tasks[val];
          this.value = this.tasks[val][0];
        } else {
          this.options = [];
          this.value = {};
        }
      }
    },
    value: function(val) {
      this.id = val.id;
    },
    id: async function(val) {
      if (Object.keys(this.group).length !== 0 && val) {
        this.$store.commit("app/openLoading", true);
        if (this.$refs.one) {
          this.$refs.one.initData();
        }
        if (this.$refs.all) {
          this.$refs.all.initData();
        }
        try {
          const res = await this.$axios.get(
            `/v1/rank/groupRankforTask/${val}/${this.group.id}`
          );
          if (res.data.allList) {
            this.all = res.data.allList;
          }
          if (res.data.userGroupList) {
            this.groupRank = res.data.userGroupList;
          }
          this.one = this.all.filter(
            item => item.userGroup.id === this.group.id
          );
          this.$store.commit("app/openLoading", false);
        } catch (err) {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 0
          });
        }
      }
    },
    group: async function(val) {
      if (Object.keys(val).length !== 0 && this.id) {
        this.$store.commit("app/openLoading", true);
        if (this.$refs.one) {
          this.$refs.one.initData();
        }
        this.one = this.all.filter(item => item.userGroup.id === val.id);
        this.$store.commit("app/openLoading", false);
      }
    },
    update: function(val) {
      if (val) {
        this.timer = setInterval(() => {
          if (this.groups[0]) {
            clearInterval(this.timer);
            if (this.$store.state.user.info.user.userGroup) {
              this.group = this.$store.state.user.info.user.userGroup;
            } else {
              this.group = this.groups[0];
            }
            this.data = this.shorts;
            this.dates = this.shorts.map(item =>
              dayjs
                .utc(item.startDate)
                .local()
                .format("YYYY/MM/DD")
            );
            this.shorts.forEach(item => {
              if (
                !this.tasks[
                  dayjs
                    .utc(item.startDate)
                    .local()
                    .format("YYYY/MM/DD")
                ]
              ) {
                this.tasks[
                  dayjs
                    .utc(item.startDate)
                    .local()
                    .format("YYYY/MM/DD")
                ] = [];
              }
              this.tasks[
                dayjs
                  .utc(item.startDate)
                  .local()
                  .format("YYYY/MM/DD")
              ].push(item);
            });

            if (this.$route.query.id) {
              let result = this.data.find(
                item => item.id === this.$route.query.id
              );
              if (result) {
                let select = dayjs
                  .utc(result.startDate)
                  .local()
                  .format("YYYY/MM/DD");
                this.date = select;
                this.options = this.tasks[select];
                this.$nextTick(() => {
                  this.value = result;
                });
              } else {
                this.$router.push("/404");
              }
            } else {
              let keys = Object.keys(this.tasks);
              keys.sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime()
              );
              let formatDate = keys.map(item =>
                new Date(item.replace(/\//g, "-")).getTime()
              );
              let max = Math.max(...formatDate);
              this.date = keys[formatDate.findIndex(item => item === max)];
              this.options = this.tasks[this.date];
              this.$nextTick(() => {
                this.value = this.tasks[this.date][0];
              });
            }
            this.$emit("load", false);
          }
        }, 10);
      }
    }
  },
  async created() {
    this.$store.commit("app/openLoading", true);
    this.timer = setInterval(() => {
      this.$store.commit("app/openLoading", true);
      if (this.groups[0]) {
        clearInterval(this.timer);
        if (this.$store.state.user.info.user.userGroup) {
          this.group = this.$store.state.user.info.user.userGroup;
        } else {
          this.group = this.groups[0];
        }
        this.data = this.shorts;
        this.dates = this.shorts.map(item =>
          dayjs
            .utc(item.startDate)
            .local()
            .format("YYYY/MM/DD")
        );
        this.shorts.forEach(item => {
          if (
            !this.tasks[
              dayjs
                .utc(item.startDate)
                .local()
                .format("YYYY/MM/DD")
            ]
          ) {
            this.tasks[
              dayjs
                .utc(item.startDate)
                .local()
                .format("YYYY/MM/DD")
            ] = [];
          }
          this.tasks[
            dayjs
              .utc(item.startDate)
              .local()
              .format("YYYY/MM/DD")
          ].push(item);
        });

        if (this.$route.query.id) {
          let result = this.data.find(item => item.id === this.$route.query.id);
          if (result) {
            let select = dayjs
              .utc(result.startDate)
              .local()
              .format("YYYY/MM/DD");
            this.date = select;
            this.options = this.tasks[select];
            this.$nextTick(() => {
              this.value = result;
            });
          } else {
            this.$router.push("/404");
          }
        } else {
          let keys = Object.keys(this.tasks);
          keys.sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          let formatDate = keys.map(item =>
            new Date(item.replace(/\//g, "-")).getTime()
          );
          let max = Math.max(...formatDate);
          this.date = keys[formatDate.findIndex(item => item === max)];
          this.options = this.tasks[this.date];
          this.$nextTick(() => {
            this.value = this.tasks[this.date][0];
          });
        }
        this.$store.commit("app/openLoading", false);
      }
    }, 10);
  }
};
</script>
