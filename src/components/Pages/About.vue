<template>
  <div>
    <h2>
      <span>Hello</span>
      <Icon size="28">
        <WorldIcon />
      </Icon>
    </h2>
    <p>I am a full-stack software engineer currently based in San Francisco.</p>
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
  span {
    margin-right: 7px;
  }
  span:nth-child(3) {
    margin-left: 7px;
  }
  svg {
    transform: translateY(4px);
  }
}
</style>
