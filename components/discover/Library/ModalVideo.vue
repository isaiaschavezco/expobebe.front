<template>
  <!-- <Modal :is-modal-visible="true" class=" py-10 z-50" @onModalClick="onSantaVideoModalClose"> -->
  <Modal :is-modal-visible="true" @onModalClick="closeModal">
    <VideoComponent
      :closeFunction="closeModal"
      :urlVideo="currentVideoUrl"
      :title="currentTitle"
      :colorCard="colorCard"
    />
  </Modal>
</template>

<script>
import Modal from "../../modal";
import { NEWBORN, UNDER, PREGNED } from "@/types/";

import VideoComponent from "@/components/layout/VideoComponent";
export default {
  props: {
    functionVideo: Function,
    colorCard: String,
    currentTitle: String,
    currentVideoUrl: String,
  },
  components: {
    Modal,
  },
  methods: {
    closeModal() {
      this.functionVideo(false, "");
    },
  },
};
</script>

<style></style>
