<template>
  <Modal :is-modal-visible="true" class="z-50">
    <ButtonExit :funcion="this.onAddedCartModalClose" />
    <div
      class="w-full md:w-10/12 relative z-50 modal__info justify-center flex items-center flex-col"
    >
      <div class="w-full header-modal__info justify-center flex items-center">
        <div
          class="w-full md:w-9/12 text-modal-confirmation text-center justify-center flex"
        >
          <img src="@/assets/img/all/nubes_cig.svg" />
        </div>
      </div>
      <div class="flex justify-center md:justify-end footer-modal__info w-full">
        <button
          @click="onAddedCartModalClose"
          class="text-xs md:text-lg text-center boton-modal__info bg-yellowcorp text-white py-2 px-1 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
        >
          Continuar Agregando
        </button>

        <button
          @click="onCheckCart"
          type="button"
          class="text-xs md:text-lg bg-pregned boton-modal__info text-white py-2 px-1 ml-4 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
        >
          Revisar mi <i class="font-bold"> wishlist</i>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import ButtonExit from "@/components/layout/ButtonExit";
import Boton from "../util/Boton";

export default {
  components: {
    ButtonExit,
  },
  methods: {
    onAddedCartModalClose() {
      this.$store.commit("shopinglist/setIsAddedCartModalShown", false);
    },
    onCheckCart() {
      this.$store.commit("shopinglist/toggleShopingCarListVisible");
      this.$store.commit("shopinglist/setIsAddedCartModalShown", false);
    },
  },
  computed: {
    isAddedCartModalShown() {
      return this.$store.state.shopinglist.isAddedCartModalShown;
    },
  },
};
</script>

<style>
.modal-validation-image {
  max-height: 90vh;
  width: 100%;
  max-width: 100%;
}
.modal__info {
  height: 80%;
}
.header-modal__info {
  height: 70%;
}
.footer-modal__info {
  height: 30%;
}
.boton-modal__info {
  max-height: 3rem;
  padding: 0.8rem;
  min-width: 20%;
  -webkit-box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.75);
}
.popup {
  animation: popup 0.5s;
}

@keyframes popup {
  0% {
    transform: scale(0.3);
  }

  50% {
    transform: scale(1);
  }

  70% {
    transform: scale(0.8);
  }

  80% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}
.imagen-principal {
  min-width: 20em;
  min-height: 20em;
}
</style>
>
