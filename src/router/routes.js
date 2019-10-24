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
          back: true
        }
      },
      {
        path: "/notices",
        component: () => import("pages/home/Notices.vue"),
        meta: {
          back: true,
          title: "公告一览"
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
          title: "绿宝石项链赛积分排行",
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
