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
        component: () => import("@/views/TariffInfo/TariffPro.vue"),
      },
      {
        name: "vip",
        path: "vip",
        component: () => import("@/views/TariffInfo/TariffVip.vue"),
      },
      {
        name: "tesla",
        path: "tesla",
        component: () => import("@/views/TariffInfo/TariffTessla.vue"),
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
    component: () => import("@/views/404Page.vue"),
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
  // @ts-ignore
  scrollBehavior() {
    return { top: 0, behavior: "instant" };
  },
});

export default router;
