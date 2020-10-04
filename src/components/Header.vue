<template>
  <header>
    <h1>Andrei Savin</h1>
    <nav>
      <ul>
        <li
          :class="{ active: activePage.name === 'about' }"
          @click="onSetActivePage('/about')"
        >
          about
        </li>
        <li>code</li>
        <li>contact</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    activePage: {
      type: Object,
    },
    onSetActivePage: {
      type: Function,
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  z-index: 10;
  position: fixed;
  top: 33%;
  width: 100%;
  margin: auto;
  text-align: center;
  transition: left 1s ease;

  h1 {
    font-size: 2.5em;
    user-select: none;
  }

  nav {
    ul {
      display: inline;
      list-style-type: none;
      padding: 0;

      li {
        display: inline;
        padding: 1em;
        cursor: pointer;
      }
    }
  }
}
</style>
