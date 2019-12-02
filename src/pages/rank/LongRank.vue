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
import { Toast, List as VanList } from "vant";
export default {
  name: "longRank",
  components: {
    VanList
  },
  data() {
    return {
      value: "",
      detail: {},
      options: [],
      tab: "all",

      all: [],
      one: [],
      allNumber: 20,
      allLoading: false,
      allFinished: false,
      oneNumber: 20,
      oneLoading: false,
      oneFinished: false,

      group: {},
      groups: []
    };
  },
  watch: {
    detail: {
      handler: function(val) {
        this.value = val.id;
      }
    },
    value: async function(val) {
      if (Object.keys(this.group).length !== 0 && val) {
        this.$store.commit("app/openLoading", true);
        this.initData();
        try {
          const res2 = await this.$axios.get(
            `/v1/rank/groupRankforTask/${val}`
          );
          const res3 = await this.$axios.get(
            `/v1/rank/groupRankforTask/${val}/${this.group.id}`
          );
          if (res2.data.allList) {
            this.all = res2.data.allList;
          }
          if (res3.data.groupList) {
            this.one = res3.data.groupList;
          }
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
      if (Object.keys(val).length !== 0 && this.value) {
        this.$store.commit("app/openLoading", true);
        this.initGroup();
        try {
          const res = await this.$axios.get(
            `/v1/rank/groupRankforTask/${this.value}/${val.id}`
          );
          if (res.data.groupList) {
            this.one = res.data.groupList;
          }
          this.$store.commit("app/openLoading", false);
        } catch (err) {
          Toast({
            message: "请求出错,请检查网络或刷新重试！",
            duration: 0
          });
        }
      }
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
      if (this.$store.state.user.info.user.userGroup) {
        this.group = this.$store.state.user.info.user.userGroup;
      } else {
        this.group = this.groups[0];
      }
      const result2 = await this.$axios.get(
        "/v1/task/search/?taskType=LongTerm"
      );
      this.options = result2.data.sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      );
      if (this.$route.query.id) {
        let result = this.options.find(
          item => item.id === this.$route.query.id
        );
        if (result) {
          this.detail = result;
          this.$store.commit("app/openLoading", false);
        } else {
          this.$router.push("/404");
        }
      } else {
        this.value = this.options[0].id;
        this.detail = this.options[0];
        this.$store.commit("app/openLoading", false);
      }
      this.$store.commit("app/openLoading", false);
    } catch (err) {
      Toast({
        message: "请求出错,请检查网络或刷新重试！",
        duration: 0
      });
    }
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
    goPersonal(id) {
      if (this.$store.state.user.info.roles.length >= 2) {
        this.$router.push(`/user/personal?uid=${id}`);
      }
    },
    initData() {
      this.all = [];
      this.one = [];
      this.allNumber = 20;
      this.allLoading = false;
      this.allFinished = false;
      this.oneNumber = 20;
      this.oneLoading = false;
      this.oneFinished = false;
    },
    initGroup() {
      this.one = [];
      this.oneNumber = 20;
      this.oneLoading = false;
      this.oneFinished = false;
    }
  }
};
</script>
