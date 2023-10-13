import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import "./styles/main.scss";
import UiButton from "@/components/UiKit/UiButton.vue";
import IconBase from "@/components/UiKit/IconBase";
import UiItem from "@/components/UiKit/UiItem.vue";
import UiCard from "@/components/UiKit/UiCard";
import UiAccordion from "@/components/UiKit/UiAccordion/UiAccordion.vue";
import UiInput from "@/components/UiKit/UiInput.vue";

import LearningImg from "@/components/UiKit/IconBase/icons/front/LearningImg.vue";
import SalaryImg from "@/components/UiKit/IconBase/icons/front/SalaryImg.vue";

const app = createApp(App);

app.component("UiButton", UiButton);
app.component("IconBase", IconBase);
app.component("UiAccordion", UiAccordion);
app.component("UiItem", UiItem);
<<<<<<< HEAD
app.component("UiInput", UiInput);
=======
app.component("UiCard", UiCard);
>>>>>>> master

app.component("LearningImg", LearningImg);
app.component("SalaryImg", SalaryImg);

app.use(Quasar, quasarUserOptions);
app.use(store);
app.use(router);
app.mount("#app");
