<template>
  <img class="mx-auto NuxtLogo" :src="require('@/assets/img/logs.png')" alt="" />
</template>

<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
