<template>
  <div class="px-5 lg:px-32 pt-5 h-full overflow-y-scroll">
    <ModalFinishedCart />
    <ModalSantaVideo v-if="isSantaVideoModalShown" />
    <ShopingCardList v-if="shopingCarListStatus" />
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <img
        class="animate-spin w-12 h-12"
        :src="require('@/assets/img/all/loading.png')"
        alt=""
        data-not-lazy
      />
    </div>
    <div v-if="!isPageLoading" class="flex flex-col items-center">
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-1 lg:gap-16 mt-10 px-1 pb-20 lg:grid-cols-4 scrollbar"
      >
        <div
          v-for="product in products"
          :key="product._id"
          class="cursor-pointer borde-disimulado imagen-brand-toy"
          @click="onTradeMarkClick(product._id)"
        >
          <img
            class="shadow-xl push-boton border-show imagen-j rounded-lg"
            :src="product.images[0]"
            alt=""
            v-lazy-load
          />
          <div
            class="text-center mt-3 lg:px-3 font-maryd text-sm md:text-lg borde-disimulado font-bold title-component-style"
          >
            {{ product.name.slice(0, 30) }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="error"
      class="w-full h-full flex justify-center items-center lg:px-16 text-center lg:text-2xl"
    >
      <div>Lo siento, parece que lo que buscas no existe o se ha movido a otra parte</div>
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";
import { PREGNED } from "../../../types/index";

export default {
  layout: "circleheader",
  components: {
    ShopingCardList,
    ModalSantaVideo,
    ModalFinishedCart,
  },
  data() {
    return {
      isPageLoading: true,
      error: false,
    };
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Juguetes");
    this.$store.commit("menu/setColor", "#FFB71B");
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isSantaVideoModalShown() {
      return this.$store.state.shopinglist.isSantaVideoModalShown;
    },
    products() {
      console.log("VEAMOS", this.$store.state.discoverStore.currentTradeMarkProducts);
      return this.$store.state.discoverStore.currentTradeMarkProducts;
    },
    idTradeMark() {
      return this.$store.state.discoverStore.currentTradeMarkId;
    },
  },
  async created() {
    let idTradeMark = this.$route.params.id;
    let currentTradeMarkInStore = this.$store.state.discoverStore.currentTradeMarkId;
    const products = this.$store.state.discoverStore.currentTradeMarkProducts;

    if (currentTradeMarkInStore != idTradeMark || products === null) {
      console.log("VUE");
      this.$store.commit("discoverStore/setCurrentTradeMarkId", idTradeMark);
      await this.getTradeMark(idTradeMark);
      await this.getProductsOfTradeMark(idTradeMark);
    }

    this.isPageLoading = false;
  },
  methods: {
    onTradeMarkClick(idProduct) {
      this.$router.push({
        name: "discoverpregned-toys-id",
        params: {
          id: idProduct,
        },
      });
    },
    async getProductsOfTradeMark(idTradeMark) {
      try {
        const { data } = await this.$api.product.getByTrademark(idTradeMark, PREGNED);
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
        const { data } = await this.$api.trademark.getById(trademarkId, PREGNED);
        if (data.status.code === "0000") {
          title = data.result.trademark.name;
          color = data.result.trademark.color;
          this.$store.commit("discoverStore/setCurrentTrademarkName", title);
          this.$store.commit("discoverStore/setCurrentTrademarkColor", color);
        } else {
          throw new Error("Parece que no existe");
        }
      } catch (err) {
        this.$store.commit("menu/setTitle", "Parece que no existe");
        this.$store.commit("menu/setColor", "#707070");
        this.error = true;
        return;
      }
      this.sendCatalogNotification(title);
      this.$store.commit("menu/setTitle", title);
      this.$store.commit("menu/setColor", color);
      this.sendCatalogNotification(title);
    },
    async sendCatalogNotification(trademarkName) {
      const sectionData = {
        email: this.$store.state.user.userEmail,
        catalog: "TRADEMARK",
        value: trademarkName,
      };
      const { data } = await this.$api.utilities.viewCatalog(sectionData);
    },
  },
};
</script>

<style scoped>
.imagen-j {
}
.title-component-style {
  text-shadow: 0px 3pt 6pt #00000029;
  color: #707070;
  margin: 1em 1em;
}
@media screen and (min-width: 2000px) {
  .title-component-style {
    font-size: 2.24rem;
  }
}
.scrollbar::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: red;
  border-radius: 20px;
  border: 2px solid red;
}
.imagen-brand-toy {
  min-height: 6em;
  max-height: 100%;
  margin: 0 auto;
}
.scrollbar::-webkit-scrollbar-track {
  border-radius: 10px;
}
.borde-disimulado {
  border: solid 1px rgba(0, 0, 0, 0.0001);
}
</style>
