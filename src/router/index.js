import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "tariff",
    component: () => import("@/views/TariffCalculatorPage"),
  },

  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/LoginPage"),
    meta: {
      layout: "EmptyLayout",
    },
  },

  {
    path: "/program",
    name: "program",
    component: () => import("@/views/TariffContainer"),
    children: [
      {
        path: "pro",
        name: "pro",
        component: () => import("@/views/TariffInfo/TariffPro"),
      },
      {
        name: "vip",
        path: "vip",
        component: () => import("@/views/TariffInfo/TariffVip"),
      },
      {
        name: "tesla",
        path: "tesla",
        component: () => import("@/views/TariffInfo/TariffTessla"),
      },
    ],
  },

  {
    path: "/cabinet",
    name: "cabinet",
    component: () => import("@/views/UserСabinetPage"),
  },

  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/404Page"),
    meta: {
      layout: "EmptyLayout",
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0, behavior: "instant" };
  },
});

export default router;
