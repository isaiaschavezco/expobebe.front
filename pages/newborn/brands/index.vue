<template>
  <div class="px-8 lg:px-32 m-auto pt-5 h-full min-w-full overflow-y-scroll">
    <ModalFinishedCart v-if="isFinishedCartModalShown" />
    <ModalSantaVideo v-if="isSantaVideoModalShown" />
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <div class="preloader"></div>
    </div>
    <div v-if="!isPageLoading" class="flex flex-col items-center">
      <div
        class="grid grid-cols-2 gap-8 mt-10 px-1 md:px-5 pb-20 md:grid-cols-3 lg:gap:16 lg:grid-cols-4"
      >
        <img
          v-for="trademark in tradeMarks"
          :key="trademark._id"
          class="rounded-lg marca cursor-pointer border-show"
          :src="trademark.imageURL"
          alt=""
          @click="onTradeMarkClick(trademark._id, trademark.name)"
        />
      </div>
      <ShopingCardList v-if="shopingCarListStatus" />
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";
import { NEWBORN, UNDER, PREGNED } from "@/types/";

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
    };
  },
  async created() {
    this.$store.commit("menu/validateTypeScreen");
    this.typeScreen = this.$store.state.menu.currentSection;
    this.principalColor =
      this.typeScreen === NEWBORN
        ? "bluenewborn"
        : this.typeScreen === UNDER
        ? "under"
        : "pregned";

    const thereAretradeMarks = this.$store.state.discoverStore.tradeMarks;
    const { data } = await this.$api.product.getAllTradeMarks(this.typeScreen);
    if (data.status.code === "0000")
      this.$store.commit("discoverStore/setTradeMarks", data.result.trademarks);
    this.isPageLoading = false;
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isSantaVideoModalShown() {
      return this.$store.state.shopinglist.isSantaVideoModalShown;
    },
    tradeMarks() {
      return this.$store.state.discoverStore.tradeMarks;
    },
    isFinishedCartModalShown() {
      // Solo se mostrará si se está ok  con los articulos del carrito
      return this.$store.state.shopinglist.isShopingCarListOk;
    },
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Marcas");
    this.$store.commit("menu/setColor", "bg-" + this.principalColor);
  },
  methods: {
    onTradeMarkClick(idTradeMark, nameTradeMark) {
      this.$router.push({
        name: "newborn-brands-id",
        params: {
          id: idTradeMark,
          typeScreen: this.typeScreen,
        },
      });
    },
  },
};
</script>

<style>
.marca {
  border-radius: 18%;

  -webkit-box-shadow: 1px 2px 13px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 13px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 2px 13px -5px rgba(0, 0, 0, 0.75);
}
</style>
