<template>
  <div class="m-auto z-50 h-full lg:mt-32">
    <ShopingCardList v-if="shopingCarListStatus" />
    <div v-if="loading" class="flex flex-col items-center justify-center w-full h-full">
      <img
        class="animate-spin w-12 h-12"
        :src="require('@/assets/img/all/loading.png')"
        alt=""
        data-not-lazy
      />
    </div>
    <NotFound v-if="notFound" />
    <template v-if="!loading && !notFound">
      <!-- elipse grande -->
      <img
        src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/elipse_azul.png"
        class="absolute elipse z-0 hidden lg:inline-block"
        data-not-lazy
      />
      <!-- PRINCIPAL CONTAINER -->
      <div class="h-full md:h-full box-border w-screen" style="position: relative">
        <!-- BLUE IMAGE SM -->
        <div class="footer-detail-product lg:hidden" />
        <div
          class="flex flex-col justify-around md:grid lg:grid-cols-2 md:grid-rows-2 xl:grid-rows-2 h-full w-full mx-auto"
        >
          <!-- product images -->
          <div
            class="flex flex-col lg:col-start-2 row-start-1 justify-start items-center z-50 imagenes"
          >
            <img
              :src="product.images[0]"
              class="my-0 shadow-lg cursor-pointer mx-auto h-auto rounded-md z-50 md:h-auto md:w-10/12"
              alt="Imagen del producto"
              @click="on360ViewClicked"
            />
            <div class="mt-5 hidden md:flex lg:mt-10">
              <img
                class="z-10 w-12 h- 12 cursor-pointer md:w-12 md:h-12 lg:w-20 lg:h-20"
                src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/btn_360.png"
                alt=""
                @click="on360ViewClicked"
              />
              <img
                v-if="product.youtubeURL"
                class="z-10 ml-5 cursor-pointer w-12 h-12 md:w-12 md:h-12 lg:w-20 lg:h-20"
                src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/Grupo 502.svg"
                alt=""
                @click="onVideoIconClicked"
              />
            </div>
          </div>
          <!--         product description-->
          <div
            class="xl:col-start-1 xl:row-start-1 z-20 pb-10 lg:relative flex flex-col z-50 justify-center items-center lg:h-full invisible-scrollbar"
          >
            <div class="flex md:hidden my-3 justify-center">
              <img
                class="z-10 w-12 cursor-pointer h-12 md:w-12 md:h-12 lg:w-20 lg:h-20"
                src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/btn_360.png"
                alt=""
                @click="on360ViewClicked"
              />
              <img
                v-if="product.youtubeURL"
                class="z-10 ml-5 w-12 h-12 md:w-12 md:h-12 lg:w-20 lg:h-20"
                src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/Grupo 502.svg"
                alt=""
                @click="onVideoIconClicked"
              />
            </div>
            <div class="flex flex-col h-full justify-center items-center z-0">
              <!-- <div class="px-3  z-10 h-32 description md:h-48 lg:h-64 xl:h-full   justify-center  mx-auto  overflow-y-scroll  invisible-scrollbar c-707070 md:w-full md:text-xl  ">
            <div class="texto  description lg:h-64   text-center mx-10 md:mx-5  font-light text-base  ">
              <p class="break-normal"> {{ product.description }}</p>
            </div>
          </div> -->
              <div
                class="h-full invisible-scrollbar px-5 z-0 overflow-y-scroll lg:mx-20 text-center text-white lg:text-grayjugueti descripcion xl:text-2xl"
              >
                <div>
                  {{ product.description.slice(0, 1000) }}
                </div>
              </div>
              <!-- outside buttons -->
              <div class="text-center py-5 pb-5 lg:mt-10 z-0">
                <button
                  class="bc-8DC112 hover:bg-green-700 text-white font-bold text-lg py-2 px-4 rounded boton z-20 lg:w-32 lg:h-12 xl:h-16 xl:w-40 xl:text-2xl"
                  @click="onWalmartShopClick"
                >
                  Comprar
                </button>
                <button
                  v-if="!blockAddButton"
                  class="bc-FCBD1B hover:bg-llow-700 text-white font-bold text-lg py-2 px-4 rounded boton ml-5 z-10 lg:w-32 lg:h-12 xl:h-16 xl:text-2xl xl:w-40"
                  @click="onAddProduct"
                >
                  Agregar
                </button>
                <button
                  v-if="blockAddButton"
                  class="bc-FCBD1B hover:bg-llow-700 text-white font-bold text-lg py-2 px-4 rounded boton ml-5 z-10 lg:w-48 lg:h-12 xl:h-16 xl:text-2xl xl:w-56"
                  @click="onCheckCart"
                >
                  Revisar mi carta
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal v-if="product" :is-modal-visible="is360ModalShown" class="z-50">
          <div class="blur fixed z-0" @click="on360ModalClose" />
          <div class="flex flex-col z-50">
            <div class="relative">
              <div class="absolute left-0 bottom-0 w-full flex justify-center pb-3">
                <img
                  class="w-8 h-8 shake-hand"
                  src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/arrastrar_black.svg"
                />
              </div>
              <VueProductSpinner
                class="w-full flex justify-center items-center imagen-principal"
                :images="product.images"
                :slider="false"
                :speed="10"
              >
                <img
                  class="animate-spin w-12 h-12"
                  src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/loading.svg"
                  alt=""
                  data-not-lazy
                />
              </VueProductSpinner>
            </div>
            <!-- inside Buttons -->
            <div class="text-center mt-5">
              <button
                v-if="!blockAddButton"
                class="bc-8DC112 hover:bg-llow-700 text-white font-bold text-xl py-2 px-4 boton ml-5 z-10 lg:w-32 lg:h-12"
                @click="onAddProduct"
              >
                Agregar
              </button>
              <button
                v-if="blockAddButton"
                class="bc-FCBD1B hover:bg-yellow-700 text-white font-bold text-lg py-2 px-4 rounded boton ml-5 z-10 lg:w-40 lg:h-12"
                @click="onCheckCart"
              >
                Revisar mi carta
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          v-if="product"
          :is-modal-visible="isVideoModalShown"
          @onModalClick="onVideoModalClose"
        >
          <iframe
            :src="product.youtubeURL"
            class="w-full toys-video-custom-height"
            frameborder="0"
            allow="autoplay; fullscreen; encrypted-media;"
            allowfullscreen
          />
        </Modal>

        <!-- Modal add more or check cart -->
        <ModalProductAdded />
        <!-- Modal place name to send, it is the last modal -->
        <ModalFinishedCart />
        <!--         Modal showing santa video -->
        <!--<ModalSantaVideo v-if="isVideoModalShown" />-->
        <ModalSantaVideo v-if="isVideoModalShown" />
      </div>
    </template>
  </div>
</template>

<script>
import VueProductSpinner from "vue-product-spinner";
import Modal from "@/components/modal";
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";
import ModalProductAdded from "@/components/discover/ModalProductAdded";
import NotFound from "@/components/util/NotFound";
import { NEWBORN } from "../../../types/index";

export default {
  layout: "circleheader",
  components: {
    VueProductSpinner,
    Modal,
    ShopingCardList,
    ModalFinishedCart,
    ModalSantaVideo,
    ModalProductAdded,
    NotFound,
  },

  data() {
    return {
      notFound: false,
      product: null,
      idProduct: null,
      is360ModalShown: false,
      isVideoModalShown: false,
      loading: true,
      isProductInRepeated: false,
      blockAddButton: false,
    };
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isVideoModalShown() {
      return this.$store.state.shopinglist.isVideoModalShown;
    },
    listItems() {
      return this.$store.state.shopinglist.wishlist.listItems;
    },
    isAddedCartModalShown() {
      return this.$store.state.shopinglist.isAddedCartModalShown;
    },
  },
  async created() {
    this.idProduct = this.$route.params.id;
    await this.getToy();
    this.loading = false;
  },
  async mounted() {
    this.validateIfThisProductExistOnWishList(this.idProduct);
  },
  methods: {
    onWalmartShopClick() {
      window.open(this.product.shopUrl, "_blank");
    },
    on360ViewClicked() {
      this.is360ModalShown = true;
    },
    on360ModalClose() {
      this.is360ModalShown = false;
    },
    onVideoIconClicked() {
      this.isVideoModalShown = true;
    },
    onVideoModalClose() {
      this.isVideoModalShown = false;
    },
    onAddedCartModal() {
      this.isAddedCartModalShown = true;
    },
    onAddedCartModalClose() {
      this.isAddedCartModalShown = false;
    },
    async onCartSent() {
      this.isAddedCartModalShown = false;
      await this.updateCard(this.card._id, "SENDED", this.card.products);
    },
    async getToy() {
      try {
        const { data } = await this.$api.product.getById(this.idProduct, NEWBORN);
        if (data.status.code === "0000") {
          this.product = data.result.product;
          this.$store.commit("menu/setTitle", this.product.name);
          await this.$store.commit("menu/setColor", " #F5213B");
        }
      } catch (error) {
        await this.$store.commit("menu/setColor", "#707070");
        this.$store.commit("menu/setTitle", "Parece que no existe");
        this.notFound = true;
      }
    },
    onCheckCart() {
      this.$store.commit("shopinglist/toggleShopingCarListVisible");
    },
    onAddProduct() {
      this.$store.commit("shopinglist/addItem", this.product);
      this.blockAddButton = true;
    },
    validateIfThisProductExistOnWishList(id) {
      let existe = false;
      this.listItems.forEach((item) => {
        if (item._id === id) {
          existe = true;
          return true;
        }
      });
      this.block = existe;
      return existe;
    },
  },
};
</script>

<style scoped>
.footer-detail-product {
  position: absolute;
  z-index: -110;
  height: 65%;
  width: 100%;
  bottom: 0;
  background-image: linear-gradient(#3cb4e5, #3cb4e5);
  border-top-left-radius: 50% 10%;
  border-top-right-radius: 50% 10%;
}

.texto {
  text-overflow: ellipsis;
}

.imagen-principal {
  min-width: 10vh;
  min-height: 10vw;
}

.elipse {
  top: 40%;
  right: -40%;
  width: 150rem;
}

.description {
  direction: rtl;
}

.descripcion {
  max-height: 10em;
  padding-top: 1em;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .elipse {
    max-width: 200%;
    width: 160%;
  }
}

@media (min-width: 1200px) {
  .elipse {
    top: 25%;
    right: -30%;
    z-index: -22323;
    width: 110%;
  }
}

.boton {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
}

.blur {
  top: -10em;
  left: -10em;
  bottom: -10px;
  transform: matrix(-1, 0, 0, -1, 0, 0);
  right: -10px;
  opacity: 0.8;
  filter: blur(100%);
  backdrop-filter: blur(26px);
  -webkit-backdrop-filter: blur(26px);
}

.imagenes {
  position: relative;
  z-index: 20;
  border-radius: 10%;
}

.invisible-scrollbar::-webkit-scrollbar {
  opacity: 0.1;
}

.bc-8DC112 {
  background-color: #8dc112 !important;
  z-index: 1;
}

.bc-8DC112 {
  background-color: #8dc112 !important;
}

.bc-FCBD1B {
  background-color: #fcbd1b !important;
}

.-right-450 {
  right: -450px;
}

.zindex {
  z-index: -202029;
}

.-bottom-450 {
  bottom: -450px;
}

.bc-FCBD1B {
  background-color: #fcbd1b !important;
}

.shake-hand {
  animation: shakehand 3s ease-in-out infinite;
}

@keyframes shakehand {
  0% {
    margin-left: 0rem;
  }

  10% {
    margin-left: 0.5rem;
  }

  20% {
    margin-left: -0.5rem;
  }

  30% {
    margin-left: 0rem;
  }

  100% {
    margin-left: 0rem;
  }
}

@media (min-width: 1024px) {
  .container-c {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    /* optional */
    -webkit-box-align: start;
    -moz-box-align: start;
    -ms-flex-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }

  .container .first_div {
    -webkit-box-ordinal-group: 2;
    -moz-box-ordinal-group: 2;
    -ms-flex-order: 2;
    -webkit-order: 2;
    order: 2;
  }

  .container .second_div {
    -webkit-box-ordinal-group: 1;
    -moz-box-ordinal-group: 1;
    -ms-flex-order: 1;
    -webkit-order: 1;
    order: 1;
  }

  .c-707070 {
    color: #707070 !important;
  }
}

@media (min-width: 768px) {
  .toys-video-custom-height {
    height: 40rem;
  }
}

.error {
  animation: shake 0.2s ease-in-out 0s 2;
  box-shadow: 0 0 0.5em #d1003d;
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
</style>
