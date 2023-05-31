<template>
  <component :is="layout"></component>
</template>

<script>
import ClearLayout from "@/layouts/ClearLayout";

export default {
  components: {
    ClearLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "ClearLayout";
    },
  },
};
</script>
