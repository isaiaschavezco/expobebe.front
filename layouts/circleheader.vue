<template>
  <div class="flex flex-col items-around overflow-hidden h-screen z-header background">
    <ModalListNames
      v-if="isCatalogView"
      :closeFunction="onCatalogClose"
      title="Descargar catálogo"
      :colorCard="headerColor"
    />
    <header class="fixed flex justify-around items-center pt-1" :class="headerColor">
      <div class="flex justify-around w-full pt-1 h-full text-center">
        <div class="flex flex-col items-center justify-center h-full ml-5 pt-2 md:ml-10">
          <img
            class="h-10 w-10 lg:h-12 lg:w-12 left-4 cursor-pointer"
            src="@/assets/img/moviles/icon_back.svg"
            alt="Back"
            @click="$router.go(-1)"
          />
          <img
            class="h-10 w-10 lg:h-12 lg:w-12 left-4 cursor-pointer"
            src="@/assets/img/moviles/icon_home.svg"
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
        class="z-50 cursor-pointer flex flex-col justify-center items-center mr-5 md:mr-10 w-12 text-center"
      >
        <img
          class="botonHeader left-2 text-white h-10 w-10 lg:h-12 lg:w-12"
          :src="require('@/assets/img/moviles/icon_wishlist.svg')"
          alt="ShopingCar"
          @click="onShopingCarButtonClick"
        />
      </div>
      <div class="md:mr-10 text-center"></div>
    </header>
    <Nuxt class="move__header" />

    <div class="fixed bottom-0 right-0 mr-8 z-40">
      <img
        v-if="currentSection === newborn"
        class="w-12 cursor-pointer md:w-20 z-50"
        src="https://expobebe.fra1.digitaloceanspaces.com/btn_descarga_rosa.png"
        alt="Boton"
        @click="onCatalogOpen"
      />
      <img
        v-if="currentSection === under"
        class="w-12 cursor-pointer md:w-20 z-50"
        src="https://expobebe.fra1.digitaloceanspaces.com/btn_descarga_morado.png"
        alt="Boton"
        @click="onCatalogOpen"
      />
      <img
        v-if="currentSection === pregned"
        class="w-12 cursor-pointer md:w-20 z-50"
        src="https://expobebe.fra1.digitaloceanspaces.com/btn_descarga_azul.png"
        alt="Boton"
        @click="onCatalogOpen"
      />
    </div>
  </div>
</template>

<script>
import Modal from "@/components/modal";
import ModalListNames from "@/components/layout/Modal";
import { NEWBORN, UNDER, PREGNED } from "@/types/";

export default {
  components: {
    Modal,
    ModalListNames,
  },

  mounted() {
    window.addEventListener("load", function () {
      setTimeout(function () {
        // This hides the address bar:
        window.scrollTo(0, 1);
      }, 0);
    });
  },
  data() {
    return {
      isCatalogView: false,
      isShopingCardOpen: true,
      under: UNDER,
      newborn: NEWBORN,
      pregned: PREGNED,
    };
  },
  computed: {
    headerTitle() {
      return this.$store.state.menu.title;
    },
    headerSize() {
      let style = "text-2xl  font-bold";
      if (this.$store.state.menu.title.length > 30) {
        style = " text-xl ";
      }
      if (this.$store.state.menu.title.length > 30) {
        style = " text-lg ";
      }
      if (this.$store.state.menu.title.length > 40) {
        style = " text-sm ";
      }
      return style;
    },
    headerColor() {
      return this.$store.state.menu.color;
    },
    currentSection() {
      return this.$store.state.menu.currentSection;
    },
    catalogState() {
      return this.$store.state.menu.isCatalogVisible;
    },
    currentRouteName() {
      return this.$route.name;
    },
    // Verifica si el boton se puede mostrar en la vista seleccionada
    buttonShopingCarStatus() {
      return this.$store.state.menu.isButtonShopingCarVisible;
    },
  },
  methods: {
    onCatalogClose() {
      this.isCatalogView = false;
    },
    onCatalogOpen() {
      this.isCatalogView = true;
    },
    onGoToHome() {
      this.$router.push({
        name: "index",
      });
    },
    onShopingCardOpen() {
      this.isShopingCardOpen = true;
    },
    onShopingCarButtonClick() {
      this.$store.commit("shopinglist/toggleShopingCarListVisible");
    },
  },
};
</script>

<style>
:root {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: 100%;
  min-height: 100%;
  --header-height: 13vh;
  --header-z-index: 10000;
  --header-z-indexplus: 20000;
}

@media screen and (max-width: 768px) {
  .h-50 {
    height: 60%;
  }
}

.precarga {
  background: transparent url("../assets/img/moviles/icon_imagen.svg") center no-repeat;
}

.background {
  background: url("../assets/img/moviles/background.png");
  background-size: cover;
}

.catalog {
  z-index: 2100;
}

header {
  z-index: var(--header-z-index);
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  min-height: var(--header-height);
  max-height: var(--header-height);
  padding-bottom: 1rem;
  border-bottom-left-radius: 35pt 35pt;
  border-bottom-right-radius: 35pt 35pt;
}
.z-index-plus {
  z-index: var(--header-z-indexplus);
}
.move__header {
  margin-top: var(--header-height);
}

.header-component-style {
  text-shadow: 0px 3pt 6pt #00000029;

  margin-right: 0.8em;
  margin-top: 0.5em;
}
.card-rounded {
  border-radius: 10%;
  -webkit-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
}

.layout-walmart-catalog {
  height: 80vh;
  width: 80vw;

  z-index: 292929292;
}

.extensor {
  min-width: 20em;
  min-height: 20em;
}

.error {
  animation: shake 0.2s ease-in-out 0s 2;
  box-shadow: 0 0 0.5em #d1003d;
}
.push-boton:active {
  animation: push 0.3s linear 1;
}
.invisible-scrollbar::-webkit-scrollbar {
  opacity: 0.1;
}

.border-show {
  border: solid 1px rgba(0, 0, 0, 0.0001);
  min-width: 100%;
}

.boton {
  min-width: 9rem;
  padding: 0.5em;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
}
.z-2000 {
  z-index: 2000;
}
.rounded-2xl {
  border-radius: 20pt;
}
@keyframes push {
  50% {
    transform: scale(0.7);
  }
}

@keyframes animatedBackground {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.8;
  }
}

.preloader {
  width: 70px;
  height: 70px;
  border: 10px solid #eee;

  border-radius: 50%;
  animation-name: girar;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: both;
}
@keyframes girar {
  0% {
    transform: rotate(0deg);
    border-top: 10px solid rgb(168, 168, 202);
  }
  50% {
    transform: rotate(180deg);
    border-top: 10px solid rgb(147, 203, 228);
  }
  100% {
    transform: rotate(360deg);
    border-top: 10px solid rgb(218, 144, 161);
  }
}
</style>
