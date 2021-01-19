<template>
  <div
    class="fixed inset-0 transition z-40 items-center w-full h-full shopingList_modal z-50"
  >
    <div
      :class="animationName"
      class="relative h-full shadow-2xl w-screen flex flex-col bg-white rounded rounded-t-lg shopingList_container md:w-10/12 md:mx-auto mt-20 md:mt-12 overflow-hidden shadow-2xl"
    >
      {{/* ShopingCar HEADER */}}
      <div class="relative text-yellowjugueti h-20 pt-16 flex justify-center items-end">
        <button
          class="absolute top-0 right-0 mt-8 mr-10 border font-bold h-6 w-6 flex items-center justify-center text-yellowjugueti shopingList_burguer-button border-yellow-500 rounded-full shadow-lg"
          @click="onShopingCarButtonClick"
        >
          <p class="place-self-center">&times;</p>
        </button>
        <div class="w-full">
          <h2
            class="pt-10 font-bold text-center text-lg sm:text-3xl lg:text-3xl shopingList_text w-full text-aquajugueti"
          >
            Mi carta a los reyes magos
          </h2>
        </div>
      </div>
      {{/* ShopingCar LIST */}}

      <div
        class="flex overflow-x-hidden flex-col md:px-12 w-full h-full md:w-full md:px-10 mx-auto box-border mb-32 pb-12 mt-10 overflow-y-scroll overflow-scroll"
      >
        <div
          v-if="listItems.length === 0 && !loading"
          class="w-full md:w-8/12 mx-auto h-screen flex justify-center items-center"
        >
          <div
            class="text-center w-32 md:w-full flex flex-col justify-center items-center my-auto lg:text-2xl"
          >
            <p class="text-aquajugueti shopingList_text block">Tu carta está vacia</p>
            <img
              :src="require('@/assets/img/all/cartofletterempty.svg')"
              class="shopingList_image mt-4"
              alt="icono de carrito de compras"
              data-not-lazy
            />
            <p class="text-aquajugueti mt-4 shopingList_text">
              Puedes encontrar muchos juguetes en esta sección
            </p>
          </div>
        </div>
        <div v-if="!loading">
          <ShopingCarItem v-for="(item, index) in listItems" :key="index" :item="item" />
        </div>
        <div class="h-5 mt-5" />
      </div>
      {{/* ShopingCar FOOTER */}}
      <div
        v-if="listItems.length !== 0"
        class="absolute h-40 md:h-32 bg-black bottom-0 shadow-lg bg-white flex flex-col border-solid justify-start items-center py-3 w-full"
      >
        <button
          type="button"
          class="block bg-yellowjugueti w-2/6 text-white mt-2 md:mt-2 hover:bg-blue-500 shadow-lg font-semibold hover:text-white py-3 px-4 hover:border-transparent rounded"
          @click="onPressSendLetterButton"
        >
          Enviar carta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ShopingCarItem from "@/components/discover/shopingcaritem";
import { NEWBORN ,PREGNED,UNDER} from '../../types/index'

export default {
  components: {
    ShopingCarItem,
  },
  data() {
    return {
      animationName: "animation_show",
      loading: false,
    };
  },
  created() {
    let path = this.$route.fullPath
    this.section = path.includes("discovernewborn") ? NEWBORN : path.includes("discoverpregned") ? PREGNED : UNDER

    
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    animation() {
      if (this.shopingCarListStatus) {
        this.animationName = "animation_show";
      }
      this.animationName = "animation_hide";
    },
    listItems() {
      return this.$store.state.shopinglist.wishlist.listItems;
    },
  },
  methods: {
    onShopingCarButtonClick() {
      if (this.shopingCarListStatus) {
        this.animationName = "animation_hide";
        // El set time out
        setTimeout(() => {
          this.$store.commit("shopinglist/toggleShopingCarListVisible");
        }, 700);
      } else {
        this.$store.commit("shopinglist/toggleShopingCarListVisible");
      }
    },
    // Trae las cartas que tenga el usuario

    onPressSendLetterButton() {
      this.$store.commit("shopinglist/sendLetter", this.section);
      this.$store.commit("shopinglist/toggleShopingCarListVisible");
    },
  },
};
</script>

<!-- Es la parte negra del modal -->

<style>
.shopingList_container {
  border-top-left-radius: 3.5rem;
  border-top-right-radius: 3.5rem;
}

.animation_show {
  animation-name: mostrarLista;
  animation-duration: 0.7s;
}

.animation_hide {
  animation-name: ocultarlista;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.shopingList_modal {
  background: rgba(0, 0, 0, 0.5);
  z-index: 100202;
}

.shopingList_image {
  width: 5rem;
  height: 5rem;
}

.shopingList_text {
  text-shadow: 0px 3px 6px #00000029;
}

.shopingList_burguer-button {
  border: 3px solid;
  box-shadow: 2px 3px 1rem #00000029;
}

.shopingList_burguer-button:active {
  animation-name: push;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
}

::-webkit-scrollbar {
  display: none;
}

@keyframes mostrarLista {
  0% {
    top: 100%;
  }

  60% {
    top: 0%;
  }

  80% {
    top: 1%;
  }

  100% {
    top: 0%;
  }
}

@keyframes ocultarlista {
  0% {
    top: 0%;
  }

  60% {
    top: 1%;
  }

  80% {
    top: 0%;
  }

  100% {
    top: 100%;
  }
}

@keyframes push {
  0% {
    transform: scale(1);
  }

  60% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}
</style>
