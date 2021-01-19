<template>
  <div class="flex flex-col items-around test-menu bg-transparent overflow-hidden marco">
    <header
      class="flex justify-around items-center"
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
    </header>
    <Nuxt />

    <div
      v-if="catalogState"
      class="fixed bton flex flex-col justify-center items-center bottom-0 right-0 mr-2 z-40"
    >
      <div class="flex justify-center items-center h-20 w-20">
        <img
          class="w-12 shadow-xl md:w-20 z-50"
          src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/icono_catalogo.png"
          alt=""
          @click="onCatalogOpen"
        />
      </div>
    </div>
    <Modal
      :is-modal-visible="isCatalogView"
      @onModalClick="onCatalogClose"
      class="catalog"
    >
      <iframe
        src="https://catalogowalmart.com.mx/"
        class="layout-walmart-catalog"
        frameborder="0"
        allowfullscreen
      />
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal";

export default {
  components: {
    Modal,
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
        name: "juguetilandia",
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
}
.marco {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

:root > iframe {
  position: absolute;
  top: 0;
  bottom: 0;
}

.test-menu {
  min-height: 100vh;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.bton {
  z-index: 1000;
}

.test-menu {
  background: url("https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/bg_toys.svg");
}

.catalog {
  z-index: 2100;
}

header {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 10vh;
  min-height: 10vh;
  max-height: 10vh;
  padding-bottom: 1rem;
  border-bottom-left-radius: 35pt 35pt;
  border-bottom-right-radius: 35pt 35pt;
}

.header-component-style {
  text-shadow: 0px 3pt 6pt #00000029;

  margin-right: 0.8em;
  margin-top: 0.5em;
}

.layout-walmart-catalog {
  height: 80vh;
  width: 80vw;

  z-index: 292929292;
}

.botonHeader:active {
  animation-name: push;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
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

*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;

  border-style: solid;
  border-color: rgba(0, 0, 0, 0.001);
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
@keyframes push {
  50% {
    transform: scale(0.7);
  }
}
@keyframes shake {
  0% {
    margin-left: 0rem;
  }

  25% {
    margin-left: 0.5rem;
  }

  75% {
    margin-left: -0.5rem;
  }

  100% {
    margin-left: 0rem;
  }
}
.otro {
  border-bottom-left-radius: 20% 20%;
  border-bottom-right-radius: 50% 20%;
}
</style>
