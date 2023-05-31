import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/tariff",
    name: "tariff",
    component: () => import("../views/TariffPage/TariffPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
