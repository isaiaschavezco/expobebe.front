<template>
  <div class="m-auto z-50 h-full lg:mt-32">
    <ShopingCardList v-if="shopingCarListStatus" />
    <div
      v-if="isPageLoading"
      class="flex flex-col items-center justify-center w-full h-full"
    >
      <img
        class="animate-spin w-12 h-12"
        :src="require('@/assets/img/all/loading.png')"
        alt=""
        data-not-lazy
      />
    </div>
    <NotFound v-if="notFound" />
    <template v-if="!isPageLoading && !notFound">
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
                  v-if="block"
                  class="bc-FCBD1B hover:bg-yellow-700 text-white font-bold text-lg py-2 px-4 rounded boton ml-5 z-10 lg:w-48 lg:h-12 xl:h-16 xl:text-xl"
                  @click="onCheckCart"
                >
                  Revisar mi carta
                </button>
                <button
                  v-if="!block"
                  class="bc-FCBD1B hover:bg-yellow-700 text-white font-bold text-lg py-2 px-4 rounded boton ml-5 z-10 lg:w-32 lg:h-12 xl:h-16 xl:text-2xl xl:w-40"
                  @click="onProductAddedToCard"
                >
                  Agregar
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
                class="bc-8DC112 hover:bg-green-700 text-white font-bold text-xl py-2 px-4 boton z-10 lg:w-32 lg:h-12"
                @click="onWalmartShopClick"
              >
                Comprar
              </button>
              <button
                v-if="!block"
                class="bc-FCBD1B hover:bg-yellow-700 text-white font-bold text-xl py-2 px-4 boton ml-5 z-10 lg:w-32 lg:h-12"
                @click="onProductAddedToCard"
              >
                Agregar
              </button>
              <button
                v-if="block"
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
        <!--<ModalSantaVideo v-if="isSantaVideoModalShown" />-->
        <ModalSantaVideo v-if="isSantaVideoModalShown" />
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
import { UNDER } from "../../../types/index";

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
  head() {
    return {
      link: [
        {
          rel: "preload",
          href:
            "https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/juguetilandia__notificación.svg",
          as: "image",
        },
        {
          rel: "preload",
          href: "@/assets/img/juguetilandia__notificación.svg",
          as: "image",
        },
      ],
    };
  },
  data() {
    return {
      notFound: false,
      product: null,
      idProduct: null,
      is360ModalShown: false,
      isVideoModalShown: false,
      card: null,
      /* nameToSanta: '', */
      isPageLoading: true,
      listOfToys: [],
      isProductInRepeated: false,
    };
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isSantaVideoModalShown() {
      return this.$store.state.shopinglist.isSantaVideoModalShown;
    },

    isAddedCartModalShown() {
      return this.$store.state.shopinglist.isAddedCartModalShown;
    },
    block: {
      // getter
      get() {
        return this.isProductInRepeated;
      },
      // setter
      set(newValue) {
        if (this.$store.state.shopinglist.isShopingCarListOk) {
          this.isProductInRepeated = false;
        }
        this.isProductInRepeated = newValue;
      },
    },
  },
  async created() {
    console.log("QUERY: ", this.$route.params);
    // //  this.$auth.$storage.setLocalStorage('userId','5f97015bc7f2a7a3cc34de3d')

    this.idProduct = this.$route.params.id;
    await this.getToy();
    this.isPageLoading = false;
  },
  async mounted() {
    this.getCardsByUserStatus("LOADING");
    this.existProductInLetter(this.idProduct);
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
      this.isFinishedCartModalShown = true;
    },
    async getToy() {
      try {
        const { data } = await this.$api.product.getById(this.idProduct, UNDER);
        if (data.status.code === "0000") {
          this.product = data.result.product;
          this.$store.commit("menu/setTitle", this.product.name);
          console.log("product: ", this.product);
          this.sendCatalogNotification(this.product.sku);
          await this.$store.commit("menu/setColor", " #F5213B");
          console.log("esto me interesa: ", this.product);
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
    async onFinishedCartModalClose() {
      if (this.onValidateFields()) {
        await this.getSantaVideoByName();
        this.isFinishedCartModalShown = false;
        this.isSantaVideoModalShown = true;
      }
    },
    onSantaVideoModalClose() {
      this.isSantaVideoModalShown = false;
    },
    async getCardsByUserStatus(status) {
      let userId = "";
      // const userId = this.$store.state.user.userId

      // userId =this.$auth.$storage.getLocalStorage('userId')
      userId = localStorage.getItem("_id");

      console.log("Esta es la data que espero revisar:", userId);

      // const userId = this.$auth.$storage.getLocalStorage('userId')
      const { data } = await this.$api.card.getByUserAndStatus(userId, status, UNDER);
      if (data.status.code === "0000") {
        this.card = data.result.cards[0];
        this.listOfToys = data.result.cards[0].products;
        this.existProductInLetter(this.idProduct);
      }
    },

    async createCard() {
      // const user = this.$auth.$storage.getLocalStorage("userId");
      const userData = {
        user: localStorage.getItem("_id"),
        // user: this.$store.state.user.userId
        // user,
      };
      console.log("Esta es la data que espero revisar 2:", userData);
      const { data } = await this.$api.card.create(userData, UNDER);
      if (data.status.code === "0000") {
        this.card = data.result.card;
      }
    },
    async updateCard(cardId, status, products) {
      try {
        const cardData = {
          user: localStorage.getItem("_id"),
          status,
          products,
        };

        const { data } = await this.$api.card.update(cardId, cardData);
        if (data.status.code === "0000") {
        }
      } catch (err) {
        console.log("ERROR UPDATE: ", err);
      }
    },
    async onProductAddedToCard() {
      // Puede que esta verificación esté de más
      if (!this.isProductInRepeated) {
        if (!this.card) {
          await this.createCard();
          this.updateCard(this.card._id, "LOADING", [this.idProduct]);
        }
        this.card.products.push(this.idProduct);
        await this.updateCard(this.card._id, "LOADING", this.card.products);
        this.$store.commit("shopinglist/setIsAddedCartModalShown", true);
        this.isProductInRepeated = true;
      } else {
      }
      this.onAddedCartModal();
    },
    async getSantaVideoByName() {
      const { data } = await this.$api.video.getByName(this.nameToSanta.toUpperCase());
      if (data.status.code === "0000") {
        this.santaVideoURL = data.result.videos[0].videoURL;
      }
    },
    onValidateFields() {
      let isFormValid = true;
      this.clearErroFields();
      if (this.nameToSanta === "") {
        this.$refs.discover_letter_santa_name.classList.add("error");
        isFormValid = false;
      }
    },
    existProductInLetter(id) {
      let existe = false;
      this.listOfToys.forEach((toy) => {
        if (toy._id === id) {
          existe = true;
          return true;
        }
      });
      this.block = existe;
      return existe;
    },
    clearErroFields() {
      if (this.$refs.discover_letter_santa_name.classList.contains("error")) {
        this.$refs.discover_letter_santa_name.classList.remove("error");
      }
    },
    async sendCatalogNotification(productName) {
      const sectionData = {
        // email: this.$store.state.user.userEmail,
        email: localStorage.getItem("email"),
        catalog: "PRODUCT",
        value: productName,
      };
      const { data } = await this.$api.utilities.viewCatalog(sectionData);
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
