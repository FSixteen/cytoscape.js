<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  :root {
    --body-sidespan: 1pt; /* html 边距 */
  }

  html, body {
    width: calc(100% - 2 * var(--body-sidespan));
    min-width: 100pt !important;
    height: calc(100% - 2 * var(--body-sidespan));
    min-height: 100pt !important;
    display: block;
    margin: var(--body-sidespan);
  }

  #app {
    width: 100%;
    height: 100%;
  }
</style>
