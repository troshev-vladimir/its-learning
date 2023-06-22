<template>
  <q-layout>
    <component :is="layout"></component>
  </q-layout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import { setCssVar } from "quasar";

export default {
  components: {
    DefaultLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "DefaultLayout";
    },
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
    setCssVar("black", "#fff");
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
