import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/TariffCalculatorPage";
import TariffSelectorPage from "@/views/TariffSelectorPage";
import Auth from "@/views/LoginPage";
import store from "@/store";

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
    path: "/tariff-selector",
    name: "tariffSelector",
    component: TariffSelectorPage,
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

router.beforeEach((to, from, next) => {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.FOR_PAGES !== "true"
  ) {
    next();
  }

  const isAuthenticated = store.getters.getUserToken;
  const isFree = to.name == "auth" || to.name == "tariffSelector";

  if (!isFree && !isAuthenticated) next({ name: "auth" });
  else next();
});

export default router;
