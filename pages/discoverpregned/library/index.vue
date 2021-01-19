<template>
  <div class="w-full overflow-y-scroll h-full">
    <ShopingCardList v-if="shopingCarListStatus" />
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
      />
    </div>
    <ModalVideo v-if="isVideoModalShown" />
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import PostLibrary from "@/components/discover/Library/PostLibrary";
import ModalVideo from "@/components/discover/Library/ModalVideo";
import { PREGNED } from "../../../types/index";

export default {
  components: {
    ShopingCardList,
    PostLibrary,
    ModalVideo,
  },
  data() {
    return {
      urlPlayingVideo: "",
      videos: [
        {
          id: 1,
          urlThumnail:
            "https://image.winudf.com/v2/image1/Y29tLmJ1bnR5YXBweC50aHVtbmFpbG1ha2VyX3NjcmVlbl8xMV8xNTYyNjg4MjU3XzA5NA/screen-11.jpg?fakeurl=1&type=.jpg",
          urlVideo: "https://www.youtube.com/embed/-nxsiOlPmmY",
          title: "Un titulo de video",
        },
        {
          id: 2,
          urlThumnail:
            "https://image.winudf.com/v2/image1/Y29tLmJ1bnR5YXBweC50aHVtbmFpbG1ha2VyX3NjcmVlbl8xMV8xNTYyNjg4MjU3XzA5NA/screen-11.jpg?fakeurl=1&type=.jpg",
          urlVideo: "https://www.youtube.com/embed/-nxsiOlPmmY",
          title: "Un segundo titulo de video",
        },
        {
          id: 3,
          urlThumnail:
            "https://image.winudf.com/v2/image1/Y29tLmJ1bnR5YXBweC50aHVtbmFpbG1ha2VyX3NjcmVlbl8xMV8xNTYyNjg4MjU3XzA5NA/screen-11.jpg?fakeurl=1&type=.jpg",
          urlVideo: "https://www.youtube.com/embed/-nxsiOlPmmY",
          title: "Un tercer titulo de video",
        },
      ],
      isPageLoading: true,
    };
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isVideoModalShown() {
      return this.$store.state.discover.isModalVideoLibraryVisible;
    },
    openMOdal() {
      this.$store.commit("discover/setIsModalVideoLibraryVisible", true);
    },
  },
  watch: {},
  layout: "circleheader",
  async created() {
    const { data } = await this.$api.book.getAll(PREGNED);
    console.log(data);
    this.videos = data.result.books;
    this.isPageLoading = false;
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Biblioteca");
    this.$store.commit("menu/setColor", "#FFB71B");
    this.$store.commit("menu/setButtonShopingCarVisible", true);
  },
  methods: {},
};
</script>

<style></style>
