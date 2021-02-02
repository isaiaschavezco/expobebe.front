<template>
  <div class="px-5 pt-5 h-full w-full overflow-y-scroll">
    <ModalFinishedCart v-if="isFinishedCartModalShown" />
    <ShopingCardList v-if="shopingCarListStatus" />
    <ModalProductAdded v-if="isAddedCartModalShown" />

    <ModalProduct
      v-if="this.showModalProduct"
      :product="this.currentProduct"
      :closeFunction="this.onCloseModal"
    />

    <div v-if="!isPageLoading" class="flex items-center justify-center w-full">
      <div
        class="w-full md:w-10/12 mx-auto grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 gap-5 flex-wrap justify-center items-center md:px-1 scrollbar mb-5"
      >
        <div
          v-for="product in products"
          :key="product._id"
          :class="'bg-' + principalColor"
          class="cursor-pointer card-brand overflow-hidden borde-disimulado imagen-brand-toy"
          @click="onTradeMarkClick(product)"
        >
          <div
            class="w-full precarga bg-white2 bg-white border-bottom-left-radius imagen__card-brand flex justify-center ites-center"
          >
            <img
              class="shadow-xl img__cardproduct push-boton border-show object-contain rounded-lg border-bottom-left-radius"
              :src="product.urlThumbnail"
              alt=""
              v-lazy-load
            />
          </div>
          <div
            class="footer__card-brand text-center md:text-left text-sm md:text-sm xl:text-lg borde-disimulado font-semibold title-component-style flex justify-content items-center"
          >
            <p>
              {{ product.name.slice(0, 50) }}
            </p>
          </div>
        </div>

        <h1 class="text-lg" v-if="products.length === 0">
          Parece que esta marca aún no tiene productos
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalProductAdded from "@/components/discover/ModalProductAdded";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";
import ModalProduct from "@/components/discover/Brands/ModalProduct";
import { NEWBORN, UNDER, PREGNED } from "@/types/";

export default {
  layout: "circleheader",
  components: {
    ShopingCardList,
    ModalSantaVideo,
    ModalFinishedCart,
    ModalProduct,
  },
  data() {
    return {
      isPageLoading: true,
      error: false,
      showModalProduct: false,
    };
  },

  async created() {
    this.$store.commit("menu/validateTypeScreen");

    let idTradeMark = this.$route.params.id;
    this.typeScreen = this.$store.state.menu.currentSection;

    let currentTradeMarkInStore = this.$store.state.discoverStore.currentTradeMarkId;
    const products = this.$store.state.discoverStore.currentTradeMarkProducts;

    this.$store.commit("discoverStore/setCurrentTradeMarkId", idTradeMark);
    await this.getTradeMark(idTradeMark);
    await this.getProductsOfTradeMark(idTradeMark);
    this.isPageLoading = false;
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Productos");
    this.$store.commit("menu/setColor", "bg-" + this.principalColor);
  },
  computed: {
    principalColor() {
      return this.$store.state.menu.currentSection === NEWBORN
        ? "bluenewborn"
        : this.typeScreen === UNDER
        ? "under"
        : "pregned";
    },
    isFinishedCartModalShown() {
      // Solo se mostrará si se está ok  con los articulos del carrito
      return this.$store.state.shopinglist.isShopingCarListOk;
    },
    isAddedCartModalShown() {
      return this.$store.state.shopinglist.isAddedCartModalShown;
    },
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    products() {
      return this.$store.state.discoverStore.currentTradeMarkProducts;
    },
    idTradeMark() {
      return this.$store.state.discoverStore.currentTradeMarkId;
    },
  },

  methods: {
    onTradeMarkClick(product) {
      this.currentProduct = product;
      this.showModalProduct = true;
    },
    onCloseModal() {
      this.currentProduct = null;
      this.showModalProduct = false;
    },
    async getProductsOfTradeMark(idTradeMark) {
      try {
        const { data } = await this.$api.product.getByTrademark(
          idTradeMark,
          this.typeScreen
        );
        if (data.status.code === "0000") {
          this.$store.commit(
            "discoverStore/setCurrentTradeMarkProducts",
            data.result.products
          );
          const l = this.$store.state.discoverStore.currentTradeMarkProducts;
        } else {
          this.$store.commit("discoverStore/setCurrentTradeMarkProducts", []);
        }
      } catch (error) {
        this.error = true;
      }
    },
    async getTradeMark(trademarkId) {
      let title = "";
      let color = "";
      try {
        const { data } = await this.$api.trademark.getById(trademarkId, this.typeScreen);
        if (data.status.code === "0000") {
          title = data.result.trademark.name;
          color = data.result.trademark.color;
          this.$store.commit("discoverStore/setCurrentTrademarkName", title);
        } else {
          throw new Error("Parece que no existe");
        }
      } catch (err) {
        this.$store.commit("menu/setTitle", "Parece que no existe");
        this.$store.commit("menu/setColor", "#707070");
        this.error = true;
        return;
      }
      this.$store.commit("menu/setTitle", title);
    },
  },
};
</script>

<style scoped>
.card-brand {
  border-radius: 10%;
  -webkit-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  min-height: 15rem;
  max-height: 100%;
  height: 100%;
}
.imagen__card-brand {
  height: 80%;
  overflow: hidden;
  max-height: 15rem;
  min-height: 15rem;
}
.img__cardproduct {
  max-height: 15rem;
  min-height: 15rem;
}

.footer__card-brand {
  height: 20%;
  padding: 1.3rem;
  line-height: 1.4rem;
}
.bg-white2 {
  background: white !important;
}
.title-component-style {
  color: white;
}

@media screen and (min-width: 2000px) {
  .img__cardproduct {
    max-height: 30rem;
  }
  .footer__card-brand {
    line-height: 1.8rem;
  }
  .imagen__card-brand {
    max-height: 20rem;
    min-height: 20rem;
  }
  .img__cardproduct {
    max-height: 20rem;
    min-height: 20rem;
  }
}
.border-bottom-left-radius {
  border-bottom-left-radius: 30pt 30pt;
}
</style>
