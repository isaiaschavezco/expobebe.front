<template>
  <div class="px-8 lg:px-32 m-auto pt-5 h-full min-w-full overflow-y-scroll">
    <ModalFinishedCart />
    <ModalSantaVideo v-if="isSantaVideoModalShown" />
    <!-- <ModalSantaVideo v-if="true" /> -->
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <img
        class="animate-spin w-12 h-12"
        src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/loading.svg"
        alt=""
        data-not-lazy
      />
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
import { Hooper, Slide } from "hooper";
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";
import "hooper/dist/hooper.css";

export default {
  layout: "circleheader",
  components: {
    Hooper,
    Slide,
    ShopingCardList,
    ModalSantaVideo,
    ModalFinishedCart,
  },
  data() {
    return {
      isPageLoading: true,
    };
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
    banners() {
      return this.$store.state.discoverStore.banners;
    },
  },
  async created() {
    const thereAreBanners = this.$store.state.discoverStore.banners;
    const thereAretradeMarks = this.$store.state.discoverStore.tradeMarks;

    if (!thereAreBanners && !thereAretradeMarks) {
      this.getAllBanners();
      const { data } = await this.$api.product.getAllTradeMarks();
      console.log(data.result.trademarks);
      if (data.status.code === "0000")
        this.$store.commit("discoverStore/setTradeMarks", data.result.trademarks);
    }
    this.isPageLoading = false;
  },

  mounted() {
    this.$store.commit("menu/setTitle", "Juguetes");
    this.$store.commit("menu/setColor", "#FFB71B");
  },
  methods: {
    onTradeMarkClick(idTradeMark, nameTradeMark) {
      this.$router.push({
        name: "discover-brands-id",
        params: {
          id: idTradeMark,
        },
      });
    },
    async getAllBanners() {
      try {
        const { data } = await this.$api.utilities.getAllBanners();
        console.log(data.result.banners);
        if (data.status.code === "0000")
          this.$store.commit("discoverStore/setBanners", data.result.banners);
      } catch (err) {
        console.log(err);
      }
    },

    onBannerClicked(shopUrl) {
      window.open(shopUrl, "_blank");
    },
  },
};
</script>

<style>
.marca {
  border-radius: 10pt;
  -webkit-box-shadow: 1px 2px 13px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 13px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 2px 13px -5px rgba(0, 0, 0, 0.75);
}
</style>

<!--<div v-if="false" class="w-11/12 h-40">
      <hooper :auto-play="true" :infinite-scroll="true" :mouse-drag="false" :touch-drag="false" :wheel-control="false" :keys-control="false" :play-speed="5000">
        <slide v-for="(banner, index) in banners" :key="index" :index="index" @click.native="onBannerClicked(banner.shopUrl)">
          <img class="mx-auto rounded-lg h-40 shadow-xl" :src="banner.imageURL" v-lazy-load>
        </slide>
      </hooper>
    </div>-->
