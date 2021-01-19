<template>
  <!-- <header
    class="flex justify-around items-center bg-transparent pb-4 lg:pb-8"
    :style="{ backgroundColor: headerColor }"
  >
    <div class="flex justify-around w-full pt-1 h-full text-center">
      <div
        class="flex flex-col items-center justify-center h-full w-10 ml-5 mt-1 md:ml-10"
      >
        <img
          class="botonHeader h-6 w-6 lg:h-8 lg:w-8 left-4 cursor-pointer"
          src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/flecha_regresar_02.svg"
          alt="Back"
          @click="$router.go(-1)"
        />
        <img
          class="botonHeader mt-2 h-6 w-6 lg:h-8 lg:w-8 left-4 cursor-pointer"
          src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/boton_regresar_home-02.svg"
          alt="Home"
          @click="onGoToHome"
        />
      </div>
      <div class="flex justify-center items-center w-full text-center">
        <h1
          id="hola"
          :class="headerSize"
          class="w-10/12 text-white text-center font-bold font-bogle header-component-style xl"
        >
          {{ headerTitle }}
        </h1>
      </div>
    </div>
    <div
      v-if="buttonShopingCarStatus"
      class="z-50 cursor-pointer flex flex-col justify-center items-center mr-5 md:mr-10 w-10 text-center"
    >
      <img
        class="botonHeader h-6 w-6 lg:h-8 lg:w-8 left-2 text-white"
        :src="require('../assets/img/letter_upload.svg')"
        alt="ShopingCar"
        @click="onShopingCarButtonClick"
      />
    </div>
    <div v-if="!buttonShopingCarStatus" class="mr-5 md:mr-10 w-10 text-center"></div>
  </header> -->
</template>

<script>
export default {};
</script>

<style></style>
