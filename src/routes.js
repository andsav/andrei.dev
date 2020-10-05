import About from "./components/Pages/About.vue";
import Code from "./components/Pages/Code.vue";
import Contact from "./components/Pages/Contact.vue";

export default {
  "/": {
    name: "home",
    component: null,
  },
  "/about": {
    name: "about",
    component: About,
  },
  "/code": {
    name: "code",
    component: Code,
  },
  "/contact": {
    name: "contact",
    component: Contact,
  },
};
