<template>
  <header :class="{ open: activePage.name !== 'home' }">
    <h1 @click="onSetActivePage('/')">Andrei Savin</h1>
    <nav>
      <ul>
        <li
          v-for="page in pages"
          :key="page"
          :class="{ active: activePage.name === page }"
          @click="onSetActivePage(`/${page}`)"
        >
          {{ page }}
        </li>
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
  data() {
    return {
      pages: ["about", "code", "contact"],
    };
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
  user-select: none;
  transition: left, width, top 200ms ease;

  &.open {
    top: 0;

    h1 {
      display: inline-block;
      margin: 0.67em 0;
      cursor: pointer;
    }
  }

  h1 {
    font-size: 2.5em;
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
