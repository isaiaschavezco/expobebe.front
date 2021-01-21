<template>
  <div class="w-full overflow-y-scroll h-full">
    <ShopingCardList v-if="shopingCarListStatus" :colorCard="principalColor" />
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <img
        class="animate-spin w-12 h-12"
        :src="require('@/assets/img/all/loading.png')"
        alt=""
        data-not-lazy
      />
    </div>
    <div
      class="flex flex-col items-center justify-center md:grid md:gap-8 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 overflow-y-scroll py-10 lg:px-20 w-full"
    >
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
        :key="item.id"
        :urlVideo="item.videoUrl"
        :title="item.name"
        :urlThumnail="item.urlThumbnail"
        :colorCard="principalColor"
        :functionVideo="setVideoModalShown"
      />
      <PostLibrary
        v-for="item in videos"
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
    this.typeScreen = this.$store.state.menu.currentSection;
    const { data } = await this.$api.book.getAll(this.typeScreen);
    this.videos = data.result.books;
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
