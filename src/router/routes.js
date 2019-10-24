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
        path: "points/:id",
        component: () => import("pages/user/pointDetail.vue"),
        meta: {
          title: "积分明细",
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
          title: "世萌外交",
          back: true
        }
      },
      {
        path: "long/:id",
        component: () => import("pages/task/LongTask.vue"),
        meta: {
          title: "众筹",
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
