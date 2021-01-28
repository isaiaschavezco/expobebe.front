<template>
  <Modal :is-modal-visible="true" @onModalClick="closeFunction">
    <div class="w-11/12 lg:w-8/12 modal_container bg-white overflow-hidden">
      <div
        :class="colorCard ? colorCard : 'bg-white'"
        class="video-header relative text-white w-full flex items-center h-1/6 p-4"
      >
        <h3 class="ml-8 lg:text-2xl font-semibold">{{ title }}</h3>
        <img
          v-if="currentSection === newborn"
          class="w-4 cursor-pointer md:w-16 z-50"
          src="https://expobebe.fra1.digitaloceanspaces.com/btn_descarga_rosa.png"
          alt="Boton"
          @click="onCatalogOpen"
        />
        <img
          v-if="currentSection === under"
          class="w-12 cursor-pointer md:w-20 z-50"
          src="https://expobebe.fra1.digitaloceanspaces.com/btn_descarga_morado.png"
          alt="Boton"
          @click="onCatalogOpen"
        />
        <img
          v-if="currentSection === pregned"
          class="w-12 cursor-pointer md:w-20 z-50"
          src="https://expobebe.fra1.digitaloceanspaces.com/btn_descarga_azul.png"
          alt="Boton"
          @click="onCatalogOpen"
        />
        <button
          class="absolute top-0 right-0 mt-4 mr-10 font-bold h-6 w-6 flex items-center justify-center text-white shopingList_burguer-button"
          @click="closeFunction"
        >
          <p class="place-self-center">&times;</p>
        </button>
      </div>
      <div class="lg:p-4 flex justity-center items-center h-full precarga">
        <iframe
          src="https://catalogowalmart.com.mx/"
          class="img__catalogo object-cover w-full h-full m-auto"
          frameborder="0"
          allowfullscreen
        />
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/modal";
import { NEWBORN, UNDER, PREGNED } from "@/types/";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      under: UNDER,
      newborn: NEWBORN,
      pregned: PREGNED,
    };
  },
  props: {
    closeFunction: Function,
    title: String,
    colorCard: String,
  },
  computed: {
    currentSection() {
      return this.$store.state.menu.currentSection;
    },
  },
  methods: {
    onCatalogOpen() {
      const win = window.open("https://catalogowalmart.com.mx/", "_blank");
      // Cambiar el foco al nuevo tab (punto opcional)
      win.focus();
    },
  },
};
</script>

<style>
.modal_container {
  border-radius: 13pt;
  margin: auto;

  height: 90% !important;
  min-height: 90%;
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
