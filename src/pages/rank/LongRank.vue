<template>
  <div class="q-pa-md" style="width: 100%;">
    <div
      class="row"
      style="width: 100%;justify-content:space-between; margin-bottom:20px;"
    >
      <q-select
        filled
        v-model="detail"
        :option-value="item => item.id"
        :option-label="item => item.taskName"
        :options="options"
        style="width:40vw;min-width:150px;"
        behavior="menu"
      />
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
        本次任务起始时间: {{ detail.startDate | prettyDate }}
      </div>
      <div class="text-weight-medium">
        本次任务终止时间: {{ detail.endDate | prettyDate }}
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
          <RankList ref="one" :ranks="one" />
        </q-tab-panel>

        <q-tab-panel name="all">
          <RankList ref="all" :ranks="all" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import RankList from "../../components/RankList";
import { Toast } from "vant";
export default {
  name: "longRank",
  components: {
    RankList
  },
  data() {
    return {
      value: "",
      detail: {},
      options: [],
      tab: "all",

      all: [],
      one: [],

      group: {},
      timer: ""
    };
  },
  props: {
    update: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    detail: {
      handler: function(val) {
        this.value = val.id;
      }
    },
    value: {
      handler: async function(val) {
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
      deep: true
    },
    group: {
      handler: async function(val) {
        if (Object.keys(val).length !== 0 && this.value) {
          this.$store.commit("app/openLoading", true);
          if (this.$refs.one) {
            this.$refs.one.initData();
          }
          this.one = this.all.filter(item => item.userGroup.id === val.id);
          this.$store.commit("app/openLoading", false);
        }
      },
      deep: true
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
            this.options = this.longs.sort(
              (a, b) =>
                new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
            );
            if (this.$route.query.id) {
              let result = this.options.find(
                item => item.id === this.$route.query.id
              );
              if (result) {
                this.detail = result;
              } else {
                this.$router.push("/404");
              }
            } else {
              this.$nextTick(() => {
                this.detail = this.options[0];
              });
            }
            this.$emit("load", false);
          }
        }, 10);
      }
    }
  },
  computed: {
    groups() {
      return this.$store.state.group.groups;
    },
    longs() {
      return this.$store.state.task.longs;
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
        this.options = this.longs.sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        );
        if (this.$route.query.id) {
          let result = this.options.find(
            item => item.id === this.$route.query.id
          );
          if (result) {
            this.detail = result;
          } else {
            this.$router.push("/404");
          }
        } else {
          this.$nextTick(() => {
            this.detail = this.options[0];
          });
        }
        this.$store.commit("app/openLoading", false);
      }
    }, 10);
  }
};
</script>
