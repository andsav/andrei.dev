<template>
  <Header />
  <Canvas :get-nearest-point="getNearestPoint">
    <canvas-renderer :on-point-update="onPointUpdate" />
  </Canvas>
  <dark-mode-toggle
    :dark-mode="darkMode"
    :on-toggle-dark-mode="toggleDarkMode"
  />
</template>

<script>
import { ref, computed } from "vue";

import onPointHover from "./helpers/onPointHover.js";
import nearestPoint from "./helpers/nearestPoint.js";

import Header from "./components/Header.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";
import Canvas from "./components/Canvas/Canvas.vue";
import CanvasRenderer from "./components/Canvas/CanvasRenderer.vue";

export default {
  name: "App",
  components: {
    CanvasRenderer,
    Canvas,
    DarkModeToggle,
    Header,
  },
  setup() {
    const browserDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const darkMode = ref(browserDarkMode);

    const getNearestPoint = computed(() =>
      darkMode.value ? nearestPoint.darkMode : nearestPoint.lightMode
    );

    const onPointUpdate = computed(() =>
      darkMode.value ? onPointHover.darkMode : onPointHover.lightMode
    );

    if (browserDarkMode) {
      document.body.classList.add("dark");
    }

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
    };

    return {
      darkMode,
      toggleDarkMode,
      onPointUpdate,
      getNearestPoint,
    };
  },
};
</script>
