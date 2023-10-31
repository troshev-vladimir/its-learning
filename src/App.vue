<template>
  <q-layout>
    <component :is="layout"></component>
  </q-layout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import { setCssVar } from "quasar";
import { mapGetters } from "vuex";
import { useMeta } from "quasar";
import store from "@/store";

useMeta({
  link: {
    name: { rel: "icon", href: "/favicon.ico" },
  },
});

export default {
  components: {
    DefaultLayout,
    EmptyLayout,
  },
  computed: {
    ...mapGetters({
      program: "tariff/getCurrentProgramm",
    }),
    layout() {
      return this.$route.meta.layout || "DefaultLayout";
    },
  },

  beforeCreate() {
    store.commit("initialiseStore");

    this.$q.notify.setDefaults({
      position: "top-right",
      timeout: 2500,
      textColor: "white",
      color: "accent",
      // actions: [{ icon: "fas fa-times", color: "white" }],
    });
    this.$q.iconSet.field.error = "fas fa-exclamation-triangle fs-sm";
  },

  created() {
    setCssVar("primary", "#101010");
    setCssVar("secondary", "#CCCCCC");
    setCssVar("accent", "#0075EB");

    setCssVar("dark", "#101010");
    setCssVar("positive", "#21ba45");
    setCssVar("negative", "#c10015");
    setCssVar("info", "#31ccec");
    setCssVar("warning", "#f2c037");

    setCssVar("white", "#fff");
    setCssVar("black", "#000");
  },

  mounted() {
    window.addEventListener("server-error", this.errorHandler);
    window.addEventListener("unauthorized", this.unauthorisedHandler);
    if (
      !localStorage.getItem("userToken")?.length ||
      !localStorage.getItem("userPhone")?.length
    ) {
      this.$router.push({ name: "auth" });
    }
  },

  beforeUnmount() {
    window.removeEventListener("server-error", this.errorHandler);
    window.removeEventListener("unauthorized", this.unauthorisedHandler);
  },

  methods: {
    errorHandler(e) {
      this.$q.notify({
        color: "negative",
        position: "top",
        message: e.detail?.message || "Что то пошло не так",
      });
    },

    unauthorisedHandler(e) {
      this.$router.push({ name: "auth" });

      this.$q.notify({
        color: "negative",
        position: "top",
        message:
          e.detail.message || "Вы не авторизованы. Для начала авторизуйтесь",
      });
    },
  },
};
</script>

<style lang="scss">
.text-custom {
  color: #ff0000;
}
.bg-custom {
  background: #ff0000;
}

html {
  scroll-behavior: smooth;
}
</style>
