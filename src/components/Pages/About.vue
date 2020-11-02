<template>
  <div>
    <h2>
      <span class="mr1">Hello,</span>
      <Icon size="28">
        <WorldIcon />
      </Icon>
    </h2>
    <p>I am Andrei, a full-stack software engineer.</p>
    <p>Thanks for visiting my website!</p>
  </div>
</template>

<script>
import Icon from "../Icon/Icon.vue";
import WorldIcon from "../Icon/WorldIcon.vue";

export default {
  name: "About",
  components: { Icon, WorldIcon },
};
</script>

<style lang="scss" scoped>
h2 {
  svg {
    transform: translateY(4px);
  }
}
</style>
