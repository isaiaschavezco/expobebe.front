<template>
  <div v-if="error" class="w-full h-full flex justify-center items-center lg:px-16 text-center lg:text-2xl">
      <div> Lo siento, parece que lo que buscas no existe o se ha movido a otra parte </div>
  </div>  
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
</script>
<style>
</style>>
