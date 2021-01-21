<template>
  <div class="px-5 lg:px-32 pt-5 h-full overflow-y-scroll">
    <ModalFinishedCart />
    <ModalSantaVideo v-if="isSantaVideoModalShown" />
    <ShopingCardList v-if="shopingCarListStatus" />
    <ModalProduct
      v-if="this.showModalProduct"
      :product="this.currentProduct"
      :closeFunction="this.onCloseModal"
    />

    <div v-if="!isPageLoading" class="flex flex-col items-center">
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-1 lg:gap-16 mt-10 px-1 pb-20 lg:grid-cols-4 scrollbar"
      >
        <div
          v-for="product in products"
          :key="product._id"
          :class="'bg-' + principalColor"
          class="cursor-pointer card-brand overflow-hidden borde-disimulado imagen-brand-toy"
          @click="onTradeMarkClick(product)"
        >
          <img
            class="shadow-xl push-boton border-show imagen-j rounded-lg border-bottom-left-radius"
            :src="product.images[0]"
            alt=""
            v-lazy-load
          />
          <div
            class="text-left lg:px-3 text-sm md:text-lg lg:text-xl borde-disimulado font-semibold title-component-style"
          >
            {{ product.name.slice(0, 30) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
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
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isSantaVideoModalShown() {
      return this.$store.state.shopinglist.isSantaVideoModalShown;
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
}
.title-component-style {
  color: white;
  padding: 1rem 1rem;
}
@media screen and (min-width: 2000px) {
  .title-component-style {
    font-size: 2.24rem;
  }
}
.border-bottom-left-radius {
  border-bottom-left-radius: 30pt 30pt;
}
</style>
