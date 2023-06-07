import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import "./styles/main.scss";
import UiButton from "@/components/UiKit/UiButton";
import IconBase from "@/components/UiKit/IconBase";
import UiItem from "@/components/UiKit/UiItem";
import UiAccordion from "@/components/UiKit/UiAccordion/UiAccordion";
const app = createApp(App);

app.component("UiButton", UiButton);
app.component("IconBase", IconBase);
app.component("UiAccordion", UiAccordion);
app.component("UiItem", UiItem);

app.use(Quasar, quasarUserOptions);
app.use(store);
app.use(router);
app.mount("#app");
