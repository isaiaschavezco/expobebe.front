<template>
<div @click="funcion()" class="w-6  h-6 rounded-full push flex justify-center items-center lg:w-10 lg:h-10 bg-white lg:bg-gray-400 lg:bg-opacity-50 cursor-pointer mr-12 mt-12 lg:mr-8 absolute top-0 right-0 lg:mt-24 lg:mr-24 z" >
    <div class="text-lg  text-red-600 font-black lg:text-white lg:text-4xl">
      &times;
    </div>
  </div>
</template>

<script>
export default {
  props: {
    funcion: Function
  }
}
</script>

<style>
.z{
  z-index:232332;
}

</style>>
