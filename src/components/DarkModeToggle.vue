<template>
  <div class="toggle-icon">
    <span
      class="toggle-icon-wrapper"
      @mouseenter="toggleActive"
      @mouseleave="toggleActive"
      @mousedown="onToggleDarkMode"
    >
      <Icon size="24">
        <component :is="iconComponent" :active="active" />
      </Icon>
    </span>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Icon from "./Icon/Icon.vue";
import MoonIcon from "./Icon/MoonIcon.vue";
import SunIcon from "./Icon/SunIcon.vue";

export default {
  name: "DarkModeToggle",
  components: { SunIcon, MoonIcon, Icon },
  props: {
    darkMode: {
      type: Boolean
    },
    onToggleDarkMode: {
      type: Function
    }
  },
  setup(props) {
    const active = ref(false);
    const iconComponent = computed(() => (props.darkMode ? SunIcon : MoonIcon));

    const toggleActive = () => {
      active.value = !active.value;
    };

    return {
      active,
      iconComponent,
      toggleActive
    };
  }
};
</script>

<style lang="scss">
.toggle-icon {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 2em 4em;
  z-index: 999;

  .toggle-icon-wrapper {
    display: inline-block;
    margin: 0;
    cursor: pointer;
  }
}
</style>
