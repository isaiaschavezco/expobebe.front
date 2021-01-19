<template>
  <Modal :is-modal-visible="isFinishedCartModalShown" class="z-50">
    <!-- <Modal :is-modal-visible="true"> -->
    <ButtonExit class="bg-black z-10" :funcion="this.onClickButtonExit" />
    <div
      class="w-11/12 lg:w-2/4 relative flex flex-col justify-items-center items-center"
    >
      <div
        class="mb-5 w-full h-full flex justify-center items-center z relative extensor"
      >
        <img
          :src="require('@/assets/img/small/juguetilandia__notificación-720.png')"
          alt=""
          data-not-lazy
          class="finished__img"
        />
        <div class="w-9/12 absolute finished__text text-center z">
          <p class="text-white font-bold text-xl md:h-10 md:text-3xl lg:text-4xl">
            Dile a los reyes magos
          </p>
          <p class="text-white font-bold text-xl md:h-10 md:text-3xl lg:text-4xl">
            cuál es tu nombre
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center z-100">
        <input
          ref="discover_letter_santa_name"
          v-model="nameToSanta"
          class="text-white placeholder-white bg-blueformjugueti w-10/12 rounded mb-5 px-5 py-2"
          type="text"
          placeholder="Escríbelo aquí..."
        />
        <div
          class="flex justify-around w-full mt-5 text-white text-sm md:text-xl lg:text-xl"
        >
          <button
            class="boton bg-blue-500 push-boton hover:bg-yellow-700 font-bold lg:px-1 lg:py-2 rounded shadow-xl"
            @click="onFinishedCartModalClose"
          >
            Enviar
          </button>
          <button
            class="boton bg-blue-500 push-boton hover:bg-yellow-700 font-bold lg:px-1 lg:py-2 rounded shadow-xl"
            @click="onClickButtonExit"
          >
            Seguir agregando
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "../modal";
import ButtonExit from "../ButtonExit";
import Boton from "../util/Boton";

export default {
  components: {
    Modal,
    ButtonExit,
    Boton,
  },
  computed: {
    isFinishedCartModalShown() {
      // Solo se mostrará si se está ok  con los articulos del carrito
      return this.$store.state.shopinglist.isShopingCarListOk;
    },
    nameToSanta: {
      get: function () {
        return this.$store.state.shopinglist.nameToSanta;
      },
      set: function (name) {
        /*         return this.$store.state.shopinglist.nameToSanta
         */
        this.$store.commit("shopinglist/setNameToSanta", name);
      },
    },
  },
  methods: {
    async onFinishedCartModalClose() {
      console.log("Este debión entrear");
      if (this.onValidateFields()) {
        this.$store.commit("shopinglist/setIsVideoModalShown", true);
        this.$store.commit("shopinglist/setIsShopingCarListOk", false);
        this.$store.commit("shopinglist/sendLetter");
        this.$store.commit("shopinglist/setListItems", []);
      }
    },
    onClickButtonExit() {
      console.log("NAasdfasfadfs");
      this.$store.commit("shopinglist/setIsShopingCarListOk", false);
    },
    onValidateFields() {
      let isFormValid = true;
      this.clearErroFields();
      if (this.nameToSanta === "") {
        this.$refs.discover_letter_santa_name.classList.add("error");
        isFormValid = false;
      }
      return isFormValid;
    },
    clearErroFields() {
      if (this.$refs.discover_letter_santa_name.classList.contains("error")) {
        this.$refs.discover_letter_santa_name.classList.remove("error");
      }
    },
  },
};
</script>

<style>
.z {
  z-index: 500;
}

.boton {
  min-width: 8rem;
  margin: 0.2rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
}
.finished__img {
  max-width: 100%;
}
.finished__text text-center {
}
@media screen and (min-width: 768px) {
}
</style>
>
