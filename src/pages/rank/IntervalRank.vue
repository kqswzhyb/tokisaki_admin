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
export default {
  components: {
    RankList
  },
  name: "intervalRank",
  data() {
    return {
      tasks: [],
      task: "",
      time: "week",
      tab: "all",

      showTime: {},
      all: [],
      one: [],

      group: {},
      timer: ""
    };
  },
  computed: {
    groups() {
      return this.$store.state.group.groups;
    },
    weekTime() {
      return this.$store.state.rank.weekTime;
    },
    monthTime() {
      return this.$store.state.rank.monthTime;
    },
    weekRankAll() {
      return this.$store.state.rank.weekRankAll;
    },
    monthRankAll() {
      return this.$store.state.rank.monthRankAll;
    },
    totalRankAll() {
      return this.$store.state.rank.totalRankAll;
    }
  },
  watch: {
    time: {
      handler: function(val) {
        if (Object.keys(this.group).length !== 0) {
          if (this.$refs.one) {
            this.$refs.one.initData();
          }
          if (this.$refs.all) {
            this.$refs.all.initData();
          }
          switch (val) {
            case "week":
              this.showTime = Object.assign({}, this.weekTime);
              this.all = JSON.parse(JSON.stringify(this.weekRankAll));
              this.one = this.all.filter(
                item => item.userGroup.id === this.group.id
              );
              break;
            case "month":
              this.showTime = Object.assign({}, this.monthTime);
              this.all = JSON.parse(JSON.stringify(this.monthRankAll));
              this.one = this.all.filter(
                item => item.userGroup.id === this.group.id
              );
              break;
            case "total":
              this.all = JSON.parse(JSON.stringify(this.totalRankAll));
              this.one = this.all.filter(
                item => item.userGroup.id === this.group.id
              );
              break;
          }
          this.$store.commit("app/openLoading", false);
        }
      }
    },
    group: {
      handler: function(val) {
        if (Object.keys(val).length !== 0) {
          this.$store.commit("app/openLoading", true);
          if (this.$refs.one) {
            this.$refs.one.initData();
          }
          switch (this.time) {
            case "week":
              this.showTime = Object.assign({}, this.weekTime);
              this.all = JSON.parse(JSON.stringify(this.weekRankAll));
              this.one = this.all.filter(item => item.userGroup.id === val.id);
              console.log(this.all, this.one);
              break;
            case "month":
              this.showTime = Object.assign({}, this.monthTime);
              this.all = JSON.parse(JSON.stringify(this.monthRankAll));
              this.one = this.all.filter(item => item.userGroup.id === val.id);
              console.log(this.all, this.one);
              break;
            case "total":
              this.all = JSON.parse(JSON.stringify(this.totalRankAll));
              this.one = this.all.filter(item => item.userGroup.id === val.id);
              console.log(this.all, this.one);
              break;
          }
          this.$store.commit("app/openLoading", false);
        }
      },
      deep: true
    }
  },
  async created() {
    this.$store.commit("app/openLoading", true);
    this.timer = setInterval(() => {
      this.$store.commit("app/openLoading", true);
      if (this.groups[0]) {
        clearInterval(this.timer);
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
        this.$store.commit("app/openLoading", false);
      }
    }, 10);
  }
};
</script>
