<template>
<!-- <Modal :is-modal-visible="true" class=" py-10 z-50" @onModalClick="onSantaVideoModalClose"> -->
<Modal :is-modal-visible="true" class="overflow-scroll py-20  z-50" @onModalClick="closeModal">
  <div class="contenedor-video w-full lg:w-10/12 overflow-scroll ">
    <!-- <iframe src="https://www.youtube.com/watch?v=-nxsiOlPmmY" class="w-full  z-50  sm:h-48 md:h-48 lg:h-full lg:py-10" frameborder="0" allow="autoplay; fullscreen; encrypted-media;" allowfullscreen /> -->
    <iframe width="560" height="315" :src="urlVideo" class="frame" frameborder="0" allow="autoplay; fullscreen; encrypted-media;"></iframe>
  </div>
</Modal>
</template>

<script>
import Modal from '../../modal'
export default {
  components: {
    Modal
  },
  methods: {
    closeModal() {
      console.log("CLICK CLOSE")
      this.$store.commit('discover/setIsModalVideoLibraryVisible', false)
      console.log(this.urlVideo)
      console.log(this.$store.state.discover.currentModalVideoLibraryUrl)
      return null
    },

  },
  computed: {
    urlVideo() {
      return this.$store.state.discover.currentModalVideoLibraryUrl.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")

    }
  },

}
</script>

<style>
.contenedor-video {
  padding-bottom: 56.25%;
  height: 0;
  overflow: visible;
  position: relative;
}

.frame {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
