const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("pages/login/Login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/home",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/home/Home.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/notice/:id",
        component: () => import("pages/home/Notice.vue"),
        meta: {
          title: "任务要求",
          back: true
        }
      },
      {
        path: "/notices",
        component: () => import("pages/home/Notices.vue"),
        meta: {
          back: true,
          title: "任务一览"
        }
      }
    ]
  },
  {
    path: "/user",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "messages/:id",
        component: () => import("pages/user/Messages.vue"),
        meta: {
          title: "我的消息",
          back: true
        }
      },
      {
        path: "scores/:id",
        component: () => import("pages/user/ScoreDetail.vue"),
        meta: {
          title: "积分明细",
          back: true
        }
      },
      {
        path: "commit/:id",
        component: () => import("pages/user/CommitRecord.vue"),
        meta: {
          title: "提交记录",
          back: true
        }
      },
      {
        path: "center/:id",
        component: () => import("pages/user/Center.vue"),
        meta: {
          title: "用户资料",
          back: true
        }
      }
    ]
  },
  {
    path: "/members",
    component: () => import("layouts/MyLayout.vue"),
    meta: {
      role: 2
    },
    children: [
      {
        path: "",
        component: () => import("pages/Members.vue"),
        meta: {
          title: "组员列表",
          back: true,
          role: 2
        }
      }
    ]
  },
  {
    path: "/groups",
    component: () => import("layouts/MyLayout.vue"),
    meta: {
      role: 3
    },
    children: [
      {
        path: "",
        component: () => import("pages/Group.vue"),
        meta: {
          title: "小组管理",
          back: true,
          role: 3
        }
      }
    ]
  },
  {
    path: "/reward",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Reward.vue"),
        meta: {
          title: "积分奖励",
          back: true
        }
      }
    ]
  },
  {
    path: "/task",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "create",
        component: () => import("pages/task/CreateTask.vue"),
        meta: {
          title: "创建任务",
          role: 3,
          back: true
        }
      },
      {
        path: "edit/:id",
        component: () => import("pages/task/EditTask.vue"),
        meta: {
          title: "修改任务",
          role: 3,
          back: true
        }
      },
      {
        path: "do/:id",
        component: () => import("pages/task/DoTask.vue"),
        meta: {
          title: "完成任务",
          back: true
        }
      }
    ]
  },
  {
    path: "/rank",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "short",
        component: () => import("pages/rank/ShortRank.vue"),
        meta: {
          title: "短期任务排行",
          back: true
        }
      },
      {
        path: "long",
        component: () => import("pages/rank/LongRank.vue"),
        meta: {
          title: "长期任务排行",
          back: true
        }
      },
      {
        path: "interval",
        component: () => import("pages/rank/IntervalRank.vue"),
        meta: {
          title: "周期积分排行",
          back: true
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
