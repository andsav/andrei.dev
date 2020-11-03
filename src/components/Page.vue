<template>
  <article :class="{ open }" class="f5 lh-copy ph4 o-0">
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
  display: grid;
  grid-template-columns: 1fr min(80ch, 100%) 1fr;

  & > * {
    grid-column: 2;
  }

  &.open {
    opacity: 1;
    padding-top: 8em;
    padding-left: 2em;
    height: auto;
    min-height: 100vh;
  }
}
</style>
