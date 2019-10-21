const routes = [
  {
    path: "/task",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "/task/short/:id",
        component: () => import("pages/task/ShortTask.vue"),
        meta: {
          title: "世萌外交"
        }
      },
      {
        path: "/task/long/:id",
        component: () => import("pages/task/LongTask.vue"),
        meta: {
          title: "众筹"
        }
      }
    ]
  },
  {
    path: "/rank",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "/rank/short/:id",
        component: () => import("pages/rank/ShortRank.vue"),
        meta: {
          title: "绿宝石项链赛积分排行"
        }
      },
      {
        path: "/task/long/:id",
        component: () => import("pages/task/LongTask.vue"),
        meta: {
          title: "众筹"
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
