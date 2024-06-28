import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import { createPinia } from "pinia";
import "vue-good-table-next/dist/vue-good-table-next.css";

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount("#app");
