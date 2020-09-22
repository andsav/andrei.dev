<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    role="presentation"
    class="icon"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    size: {
      type: [Number, String],
      default: 18
    }
  }
};
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>
