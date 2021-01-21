<template>
  <Modal :is-modal-visible="true" @onModalClick="closeFunction">
    <div class="w-11/12 lg:w-8/12 modal_container bg-white overflow-hidden">
      <div
        :class="colorCard ? colorCard : 'bg-white'"
        class="video-header relative text-white w-full h-1/6 p-4"
      >
        <h3 class="ml-8 lg:text-2xl font-semibold">{{ title }}</h3>
        <button
          class="absolute top-0 right-0 mt-4 mr-10 font-bold h-6 w-6 flex items-center justify-center text-white shopingList_burguer-button"
          @click="closeFunction"
        >
          <p class="place-self-center">&times;</p>
        </button>
      </div>
      <div class="lg:p-4 flex justity-center items-center h-full precarga">
        <img
          src="https://ahorraya.com.ar/public/gimg/7/4/0/6/6/8/740668-900-100000.jpg"
          class="img__catalogo object-cover w-2/6 m-auto"
        />
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/modal";

export default {
  components: {
    Modal,
  },
  props: {
    closeFunction: Function,
    title: String,
    colorCard: String,
  },
};
</script>

<style>
.modal_container {
  border-radius: 13pt;
  margin: auto;
  height: 90%;
}
.video-header {
  -webkit-box-shadow: 0px 2px 33px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 33px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 33px -17px rgba(0, 0, 0, 0.75);
}
.contenedor-video {
  height: 0px;
  width: 100%;
  padding-bottom: 56.25%; /* Relación: 16/9 = 56.25% */
  position: relative;
}

.img__catalogo {
  border-radius: 20pt;
}
</style>
