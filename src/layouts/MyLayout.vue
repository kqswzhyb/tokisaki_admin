<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="main-b">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          v-if="!$route.meta.back"
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-btn
          flat
          dense
          round
          v-else
          @click="$router.go(-1)"
          icon="arrow_back"
          aria-label="Menu"
        />

        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="account_circle"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="233"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable to="/rank/short">
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>短期排行</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/rank/long">
          <q-item-section avatar>
            <q-icon name="insert_chart_outlined" />
          </q-item-section>
          <q-item-section>
            <q-item-label>长期排行</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/rank/interval">
          <q-item-section avatar>
            <q-icon name="update" />
          </q-item-section>
          <q-item-section>
            <q-item-label>周期排行</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/notices?type=0">
          <q-item-section avatar>
            <q-icon name="library_books" />
          </q-item-section>
          <q-item-section>
            <q-item-label>短期任务</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/notices?type=1">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>长期任务</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="roles >= 3" to="/task/create">
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>

          <q-item-section>
            创建任务
          </q-item-section>
        </q-item>

        <q-item clickable v-if="roles >= 2" to="/members">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>

          <q-item-section>
            组员列表
          </q-item-section>
        </q-item>

        <q-item clickable v-if="roles >= 3" to="/groups">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>
            小组管理
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      :width="233"
      side="right"
      overlay
      elevated
    >
      <!-- drawer content -->
      <q-scroll-area
        style="height: calc(100% - 131px); margin-top: 131px; border-right: 1px solid #ddd"
      >
        <q-list>
          <!-- <q-item clickable v-ripple to="/user/messages/2">
            <q-item-section avatar class="q-ml-sm">
              <q-icon
                name="img:statics/icons/message.svg"
                style="font-size:20px;"
              />
            </q-item-section>

            <q-item-section>
              <div>
                我的消息
                <q-badge v-if="badge" transparent align="middle" color="red">
                  {{ badge }}
                </q-badge>
              </div>
            </q-item-section>
          </q-item> -->

          <q-item clickable v-ripple to="/notices?type=2">
            <q-item-section avatar class="q-ml-sm">
              <q-icon
                name="img:statics/icons/task.svg"
                style="font-size:20px;"
              />
            </q-item-section>

            <q-item-section>
              我的任务
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="`/user/scores/${this.$store.state.user.info.user.id}`"
          >
            <q-item-section avatar class="q-ml-sm">
              <q-icon
                name="img:statics/icons/empty-star.svg"
                style="font-size:20px;"
              />
            </q-item-section>

            <q-item-section>
              积分明细
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="`/user/center/${this.$store.state.user.info.user.id}`"
          >
            <q-item-section avatar class="q-ml-sm">
              <q-icon
                name="img:statics/icons/person.svg"
                style="font-size:20px;"
              />
            </q-item-section>

            <q-item-section>
              个人中心
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/home">
            <q-item-section avatar class="q-ml-sm">
              <q-icon
                name="img:statics/icons/home.svg"
                style="font-size:20px;"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>返回首页</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar class="q-ml-sm">
              <q-icon
                name="img:statics/icons/logout.svg"
                style="font-size:20px;"
              />
            </q-item-section>

            <q-item-section>
              退出登录
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        :ratio="16 / 9"
        :src="require('../assets/bg.jpg')"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="44px" class="q-mb-xs q-mt-xs">
            <img
              v-if="info.user.iconUrl"
              :src="info.user.iconUrl.replace('http', 'https')"
              width="40"
              height="40"
            />
            <img
              v-else
              src="../assets/default_user.jpg"
              width="40"
              height="40"
            />
          </q-avatar>
          <div class="text-weight-bold" style="color:#505050;">
            {{ info ? info.user.nickName : "未登录" }}
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container style="min-height:100vh;">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        style="min-height:100vh;"
      >
        <router-view v-show="!loading" :update="updating" @load="update" />
      </van-pull-refresh>
      <Loading v-show="loading" />
    </q-page-container>
  </q-layout>
</template>

<script>
import Loading from "../pages/Loading";
export default {
  name: "MyLayout",
  components: {
    Loading
  },

  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      badge: 3,
      isLoading: false,
      updating: false,
      timer: ""
    };
  },
  computed: {
    info() {
      return this.$store.state.user.info;
    },
    roles() {
      return (
        Object.keys(this.$store.state.user.info).length !== 0 &&
        this.$store.state.user.info.roles &&
        this.$store.state.user.info.roles.length
      );
    },
    loading() {
      return this.$store.state.app.loading;
    }
  },
  async created() {
    this.$store.commit("app/openLoading", true);
    try {
      const flag = await this.$store.dispatch("user/getCommon");
      if (flag) {
        this.$store.commit("app/openLoading", false);
      }
    } catch (err) {
      this.$message.error("请求出错,请检查网络或刷新重试！");
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
    update(data) {
      this.updating = data;
    },
    async onRefresh() {
      try {
        this.$store.commit("app/openLoading", false);
        const flag = await this.$store.dispatch("user/getCommon");
        this.updating = true;
        this.timer = setInterval(() => {
          if (flag && !this.updating) {
            clearInterval(this.timer);
            this.isLoading = false;
          }
        }, 100);
      } catch (err) {
        this.$message.error("请求出错,请检查网络或刷新重试！");
      }
    }
  }
};
</script>
