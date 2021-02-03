<template>
  <div class="splash-screen__container fixed inset-0">
    <Nuxt />
  </div>
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
.splash-screen__container {
}

.img_splash-screen {
  object-fit: cover;
  height: 100%;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 110;
}
.logo__img_splash-screen {
  width: 30%;
  z-index: 120;
}

@media screen and (min-width: 768px) {
  .logo__img_splash-screen {
    width: 20%;
  }
  .estrella__loading {
    width: 25rem !important;
    margin: auto auto;
  }
}

.estrella__loading {
  position: absolute;
  z-index: 100;
  width: 13rem;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 5s;
  animation-name: spinner-loading;
}

@keyframes spinner-loading {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.3);
  }
  to {
    transform: rotate(1turn) scale(0.9);
  }
}
</style>
