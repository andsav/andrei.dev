<template>
  <Header :active-page="activePage" :on-set-active-page="setActivePage" />
  <Page :open="activePage.name !== 'home'">
    <component :is="activePage.component" />
  </Page>
  <Canvas
    :get-nearest-point="getNearestPoint"
    :open="activePage.name !== 'home'"
  >
    <canvas-renderer :on-point-update="onPointUpdate" />
  </Canvas>
  <dark-mode-toggle
    :dark-mode="darkMode"
    :on-toggle-dark-mode="toggleDarkMode"
  />
</template>

<script>
import { ref, computed } from "vue";

import routes from "./routes.js";

import onPointHover from "./helpers/onPointHover.js";
import nearestPoint from "./helpers/nearestPoint.js";

import Header from "./components/Header.vue";
import Page from "./components/Page.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";
import Canvas from "./components/Canvas/Canvas.vue";
import CanvasRenderer from "./components/Canvas/CanvasRenderer.vue";

export default {
  name: "App",
  components: {
    Page,
    CanvasRenderer,
    Canvas,
    DarkModeToggle,
    Header,
  },
  setup() {
    /*
      Router
     */
    const activeRoute = ref(window.location.pathname);
    const activePage = computed(
      () => routes[activeRoute.value] || { name: null, component: null }
    );
    const setActivePage = (page) => {
      history.pushState({}, null, page === activeRoute.value ? "/" : page);
      activeRoute.value = window.location.pathname;
    };
    window.onpopstate = () => {
      activeRoute.value = window.location.pathname;
    };

    /*
      Dark mode toggle
     */
    const storedDarkMode = window.localStorage.getItem("darkMode");
    const browserDarkMode = !!window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const defaultDarkMode =
      storedDarkMode != null ? !!+storedDarkMode : browserDarkMode;

    const darkMode = ref(defaultDarkMode);

    if (defaultDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
      window.localStorage.setItem("darkMode", String(+darkMode.value));
    };

    /*
      Background canvas interactions
     */
    const getNearestPoint = computed(() =>
      darkMode.value ? nearestPoint.darkMode : nearestPoint.lightMode
    );

    const onPointUpdate = computed(() =>
      darkMode.value ? onPointHover.darkMode : onPointHover.lightMode
    );

    return {
      activePage,
      setActivePage,
      darkMode,
      toggleDarkMode,
      onPointUpdate,
      getNearestPoint,
    };
  },
};
</script>
