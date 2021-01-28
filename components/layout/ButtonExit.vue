<template>
  <button
    class="absolute top-0 right-0 mt-4 mr-5 md:mr-10 font-bold h-6 w-6 flex items-center justify-center shopingList_burguer-button"
    :class="color ? color : 'text-white'"
    @click="funcion"
  >
    <p class="place-self-center">&times;</p>
  </button>
</template>

<script>
export default {
  props: {
    funcion: Function,
    color: String,
  },
};
</script>

<style>
.z {
  z-index: 232332;
}
</style>
>
