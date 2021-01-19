<template>
  <button :class="bg" class="bc-8DC112 hover:bg-green-700 text-white font-bold text-lg py-2 px-4 rounded boton z-20 lg:w-32 lg:h-12 xl:h-16 xl:w-40 xl:text-2xl" @click="funcion()">
              {{text}}
  </button>
</template>

<script>
export default {
  props: {
    funcion: Function,
    bg:String,
    text:String
  }
}
</script>

<style>
.z{
  z-index:232332;
}

</style>>

