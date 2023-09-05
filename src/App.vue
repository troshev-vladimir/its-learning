<template>
  <q-layout>
    <component :is="layout"></component>
  </q-layout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import { setCssVar } from "quasar";
import apiTariff from "@/api/tariff";
import { mapGetters } from "vuex";
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
    this.$store.commit("initialiseStore");
    this.$q.notify.setDefaults({
      position: "top-right",
      timeout: 2500,
      textColor: "white",
      color: "accent",
      // actions: [{ icon: "fas fa-times", color: "white" }],
    });
    this.$q.iconSet.field.error = "fas fa-exclamation-triangle fs-sm";
  },

  mounted() {
    apiTariff
      .getTariffs()
      .then((responce) => {
        // Проверка на актуальность данных в ЛС и сторе
        // if (Array.isArray(responce)) {
        //   responce.reduce((el, acc) => {
        //     return acc || el.id === this.$store.state.tariff.programs;
        //   }, false);
        // }
        this.$store.commit("tariff/setPrograms", responce);
      })
      .then(() => {
        this.setIntheMiddle();
      })
      .catch((e) => {
        console.log(e);
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Что то пошло не так",
        });
      });
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
  methods: {
    setIntheMiddle() {
      if (!this.$store.state.tariff.payment) {
        const value =
          this.program.offermax -
          (this.program.offermax - this.program.offermin) / 2;

        this.$store.commit("tariff/setPayment", value);
      }
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
