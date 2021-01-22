<template>
  <div class="bg-brand test-menu"><Nuxt /></div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  height: 100vh;
}

.test-menu {
  min-height: 100vh;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

body {
  height: 100%;
}
.bg-brand {
  background: url("https://expobebe.fra1.digitaloceanspaces.com/plashscreen.png") center
    repeat;
  background-blend-mode: overlay;
}
</style>
