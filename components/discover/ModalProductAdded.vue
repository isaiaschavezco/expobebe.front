<template>
  <Modal :is-modal-visible="isAddedCartModalShown" class="z-50">
    <ButtonExit :funcion="this.onAddedCartModalClose" />
    <div class="w-11/12 lg:w-2/4 relative z-50">
      <div
        class="mb-5 z extensor w-full relative flex justify-center flex items-center flex-col"
        style="position: relative"
      >
        <img
          :src="require('@/assets/img/small/juguetilandia__notificación-720.png')"
          class="modal-validation-image"
          alt=""
          data-not-lazy
        />
        <div class="w-9/12 text-modal-confirmation text-center">
          <p class="text-white font-bold text-xl md:h-10 md:text-3xl lg:text-4xl">
            ¡Excelente!
          </p>
          <p class="text-white font-bold text-xl md:h-10 md:text-3xl lg:text-4xl">
            Hemos apuntado este juguete en tu cartita
          </p>
        </div>
      </div>
      <div class="flex justify-around">
        <button
          class="boton push-boton bc-8DC112 w-5/12 bg-green-500 hover:bg-green-700 text-white font-bold text-base md:text-xl px-1 rounded shadow-xl md:h-16"
          @click="onAddedCartModalClose"
        >
          Continuar agregando
        </button>
        <!-- <button class="bc-FCBD1B w-5/12 bg-yellow-500 hover:bg-yellow-700 text-white font-bold text-xl px-1 rounded shadow-xl ml-5 md:h-16" @click="onCartSent">
              Enviar mi carta a santa
            </button> -->
        <button
          class="boton bc-FCBD1B w-5/12 bg-yellow-500 hover:bg-yellow-700 text-white font-bold text-base md:text-xl px-1 rounded shadow-xl ml-5 md:h-16"
          @click="onCheckCart"
        >
          Revisar mi cartita
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import ButtonExit from "../ButtonExit";
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
.text-modal-confirmation {
  position: absolute;
  max-width: 70%;
  margin: auto;
  left: calc(10%);
  top: 30%;
}
@media (min-width: 1200px) {
  .text-modal-confirmation {
    position: absolute;
    left: calc(5%);
    top: 35%;
  }
}
@media (min-width: 1500px) {
  .text-modal-confirmation {
    position: absolute;
    left: 10%;
    top: 35%;
  }
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
