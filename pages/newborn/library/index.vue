<template>
  <div class="w-full overflow-y-scroll h-full">
    <ShopingCardList v-if="shopingCarListStatus" :colorCard="principalColor" />
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <div class="preloader"></div>
    </div>
    <div class="flex flex-wrap items-center justify-center py-10 lg:px-20 w-full">
      <PostLibrary
        v-for="item in this.videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
    </div>
    <ModalVideo
      v-if="isVideoModalShown"
      :functionVideo="this.setVideoModalShown"
      :colorCard="principalColor"
      :currentVideoUrl="currentVideoUrl"
      :currentTitle="currentTitle"
    />
    <div class="w-full flex justify-center items-center">
      <h1
        class="w-full text-gray-800 text-center font-semibold text-sm md:text-lg"
        v-if="videos.length === 0"
      >
        Parece que no hay videos en esta sección.
      </h1>
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import PostLibrary from "@/components/discover/Library/PostLibrary";
import ModalVideo from "@/components/discover/Library/ModalVideo";
import { NEWBORN, UNDER, PREGNED } from "@/types/";

export default {
  layout: "circleheader",
  components: {
    ShopingCardList,
    PostLibrary,
    ModalVideo,
  },
  data() {
    return {
      isPageLoading: true,
      isVideoModalShown: false,
      currentVideoUrl: "",
      currentTitle: "",
      videos: [],
    };
  },
  computed: {
    principalColor() {
      let typeScreen = this.$store.state.menu.currentSection;
      return typeScreen === NEWBORN
        ? "bg-bluenewborn"
        : typeScreen === UNDER
        ? "bg-under"
        : "bg-pregned";
    },
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
  },

  async created() {
    this.$store.commit("menu/validateTypeScreen");

    this.typeScreen = this.$store.state.menu.currentSection;
    const { data } = await this.$api.book.getAll(this.typeScreen);
    this.videos = data.result.books;
    console.log(this.videos);
    this.isPageLoading = false;
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Biblioteca");
    this.$store.commit("menu/setColor", this.principalColor);
    this.$store.commit("menu/setButtonShopingCarVisible", true);
  },
  methods: {
    setVideoModalShown(status, url, title) {
      this.isVideoModalShown = status;
      this.currentVideoUrl = url;
      this.currentTitle = title;
    },
  },
};
</script>

<style></style>
