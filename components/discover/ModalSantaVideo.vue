<template>
  <Modal
    :is-modal-visible="true"
    class="py-10 z-50 overflow-y-auto"
    @onModalClick="onSantaVideoModalClose"
  >
    <div
      class="w-6 h-6 rounded-full push lg:w-10 lg:h-10 z-50 bg-white lg:bg-gray-400 lg:bg-opacity-50 cursor-pointer mr-12 mt-12 absolute top-0 right-0 lg:mt-8 lg:mr-24 z-50 flex justify-center items-center"
      @click="onSantaVideoModalClose"
    >
      <div
        class="text-lg place-self-center justify-self-center text-red-600 font-black lg:text-white lg:text-4xl"
      >
        &times;
      </div>
    </div>
    <div v-if="loading" class="absolute w-full h-full flex items-center justify-center">
      <img
        class="animate-spin w-12 h-12"
        src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/loading.svg"
        alt=""
        data-not-lazy
      />
    </div>
    <div class="contenedor-video w-full lg:w-10/12 overflow-scroll">
      <iframe
        :src="santaVideoURL"
        width="560"
        height="315"
        class="frame"
        frameborder="0"
        allow="autoplay; fullscreen; encrypted-media;"
        allowfullscreen
      />
    </div>
  </Modal>
</template>

<script>
import Modal from "../modal";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      loading: true,
      santaVideoURL: "",
    };
  },
  created: async function () {
    const { data } = await this.$api.video.getByName(this.nameToSanta.toUpperCase());
    if (data.status.code === "0000") {
      console.log("santaVideoURL: ", data.result.videos[0].videoURL);
      this.santaVideoURL = data.result.videos[0].videoURL;
      this.loading = false;
    }
  },

  computed: {
    nameToSanta: {
      get: function () {
        return this.$store.state.shopinglist.nameToSanta;
      },
    },
    isSantaVideoModalShown() {
      return this.$store.state.shopinglist.isSantaVideoModalShown;
    },
  },
  methods: {
    onSantaVideoModalClose() {
      this.$store.commit("shopinglist/setIsVideoModalShown", false);
    },
  },
};
</script>

<style scoped>
.contenedor-video {
  padding-bottom: 56.25%;
  height: 0;
  overflow: visible;
  position: relative;
}

.frame {
  position: absolute;
  height: 95%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
