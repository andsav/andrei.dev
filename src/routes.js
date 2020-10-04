import About from "./components/Pages/About.vue";

export default {
  "/": {
    name: "home",
    component: null,
  },
  "/about": {
    name: "about",
    component: About,
  },
};
