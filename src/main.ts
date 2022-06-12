import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import VueKonva from "vue-konva";

import "./assets/base.css";

const app = createApp(App);

app.use(VueKonva);
app.use(createPinia());

app.mount("#app");
