import "./styles/quasar.scss";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "quasar/dist/quasar.addon.prod.css";
import { Notify } from "quasar";

export default {
  plugins: { Notify },
  config: {
    notify: {},
    screen: {
      bodyClasses: true, // <<< add this
    },
  },
  framework: {
    cssAddon: true,
  },
  supportTS: true,
  extras: ["fontawesome-v5"],
};
