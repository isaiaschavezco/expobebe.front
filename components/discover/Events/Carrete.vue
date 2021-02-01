<template>
  <div class="fixed bg-transparent w-full flex justify-center items-center z-20">
    <div
      class="flex justify-center items-center mr-6 cursor-pointer triangulo"
      @click="functionBefore"
    ></div>
    <div
      class="text-lg md:text-2xl lg:text-2xl xl:text-4xl text-graycorp rounded px-10 py-1 font-semibold capitalize"
    >
      {{ months[selectedMonth] }}
    </div>
    <div
      class="flex justify-center items-center ml-6 cursor-pointer triangulo-invertido"
      @click="functionNext"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    functionNext: Function,
    functionBefore: Function,
    months: Array,
    selectedMonth: Number,
  },
};
</script>

<style>
.triangulo {
  width: 0;
  height: 0;
  border-right: 25px solid rgb(147, 203, 228);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-radius: 10px;
}
.triangulo-invertido {
  width: 0;
  height: 0;
  border-left: 25px solid rgb(147, 203, 228);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-radius: 10px;
}
</style>
