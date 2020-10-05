<template>
  <article :class="{ open }" class="f5 lh-copy ph4">
    <slot />
  </article>
</template>

<script>
export default {
  name: "Page",
  props: {
    open: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  opacity: 0;

  &.open {
    opacity: 1;
    padding-top: 8em;
    padding-left: 2em;
    height: 100vh;
  }
}
</style>
