<template>
  <q-layout>
    <component :is="layout"></component>
  </q-layout>
</template>

<script>
import ClearLayout from "@/layouts/ClearLayout";
import { setCssVar } from "quasar";
export default {
  components: {
    ClearLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "ClearLayout";
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
</style>
