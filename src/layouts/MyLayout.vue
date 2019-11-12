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
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable to="/home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>首页</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/rank/short/2">
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>短期排行</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/rank/long/2">
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
    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <!-- drawer content -->
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/user/messages/2">
            <q-item-section avatar>
              <q-icon name="sms" />
            </q-item-section>

            <q-item-section>
              <div>
                我的消息
                <q-badge v-if="badge" transparent align="middle" color="red">
                  {{ badge }}
                </q-badge>
              </div>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/notices?type=3">
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>

            <q-item-section>
              我的任务
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/scores/7">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              积分明细
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/center/2">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              个人中心
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              退出登录
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../assets/default_user.jpg" />
          </q-avatar>
          <div class="q-ml-sm text-weight-bold">
            {{ info ? info.username : "未登录" }}
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      badge: 3
    };
  },
  computed: {
    info() {
      return this.$store.state.user.info;
    },
    roles() {
      return this.$store.state.user.info.roles.length;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    }
  }
};
</script>
