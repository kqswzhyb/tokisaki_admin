const routes = [
  {
    path: "/",
    redirect: "/home"
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
      }
    ]
  },
  {
    path: "/task",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "short/:id",
        component: () => import("pages/task/ShortTask.vue"),
        meta: {
          title: "短期任务",
          back: true
        }
      },
      {
        path: "long/:id",
        component: () => import("pages/task/LongTask.vue"),
        meta: {
          title: "长期任务",
          back: true
        }
      },
      {
        path: "create",
        component: () => import("pages/task/CreateTask.vue"),
        meta: {
          title: "创建任务",
          back: true
        }
      },
      {
        path: "edit/:id",
        component: () => import("pages/task/EditTask.vue"),
        meta: {
          title: "修改任务",
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
        path: "short/:id",
        component: () => import("pages/rank/ShortRank.vue"),
        meta: {
          title: "短期积分排行",
          back: true
        }
      },
      {
        path: "long/:id",
        component: () => import("pages/rank/LongRank.vue"),
        meta: {
          title: "长期积分排行",
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
