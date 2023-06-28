import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/TariffCalculatorPage";
import Auth from "@/views/LoginPage";
const routes = [
  {
    path: "/auth",
    name: "auth",
    component: Auth,
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

  {
    path: "/",
    name: "tariff",
    component: Home,
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
