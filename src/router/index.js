import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "tariff",
    component: () => import("@/views/TariffCalculatorPage"),
  },

  {
    path: "/program",
    name: "program",
    component: () => import("@/views/TariffContainer"),
    children: [
      {
        path: "pro",
        name: "pro",
        component: import("@/views/TariffInfo/TariffPro"),
      },
      {
        name: "vip",
        path: "vip",
        component: import("@/views/TariffInfo/TariffVip"),
      },
      {
        name: "tesla",
        path: "tesla",
        component: import("@/views/TariffInfo/TariffTessla"),
      },
    ],
  },

  {
    path: "/cabinet",
    name: "cabinet",
    component: () => import("@/views/UserСabinetPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior: "instant" };
  },
});

export default router;
