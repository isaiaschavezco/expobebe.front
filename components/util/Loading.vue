<template>
    <div
      v-if="loading"
      class="absolute w-full h-full flex items-center justify-center z-50"
    >
      <img
        class="animate-spin  w-12 h-12"
        src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/loading.svg"
        alt=""
        data-not-lazy
      />
    </div>
</template>

<script>
  export default{
  props:{
    loading:Boolean
  }
  }
  
</script>
<style>
</style>
