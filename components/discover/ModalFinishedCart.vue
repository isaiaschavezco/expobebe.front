<template>
  <Modal :is-modal-visible="true">
    <!-- <Modal :is-modal-visible="true"> -->
    <ButtonExit :funcion="this.onClickButtonExit" />
    <div class="w-11/12 modal__info flex flex-col justify-items-center items-center">
      <div
        class="relative w-full md:w-9/12 header-modal__info text-center flex justify-center items-center"
      >
        <img src="@/assets/img/all/nubes.svg" class="img-modal__info" />

        <div>
          <p
            class="relative z-10 text-gray-800 font-bold mt-12 lg:mt-24 text-sm md:text-xl lg:text-3xl xl:text-4xl"
          >
            Cuéntanos, ¿Cuál es el género de tu bebé?
          </p>
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-center w-full footer-modal__info mt-8"
      >
        <div
          class="w-full md:w-4/12 p-8 flex flex-col items-center justify-center bg-white text-gray-600 rounded-lg h-full"
        >
          <div class="flex w-full justify-start">
            <p>
              <label class="custom-radio-checkbox">
                <!-- Input oculto -->
                <input
                  class="custom-radio-checkbox__input"
                  type="radio"
                  name="genero"
                  value="female"
                  checked
                  v-model="gender"
                />
                <!-- Imagen en sustitucion -->
                <span
                  class="custom-radio-checkbox__show custom-radio-checkbox__show--radio--nina"
                ></span>
                <!-- Texto -->
                <span class="custom-radio-checkbox__text text-lg">Niña</span>
              </label>
            </p>
            <p class="ml-5">
              <label class="custom-radio-checkbox">
                <!-- Input oculto -->
                <input
                  class="custom-radio-checkbox__input"
                  type="radio"
                  name="genero"
                  value="male"
                  v-model="gender"
                />
                <!-- Imagen en sustitucion -->
                <span
                  class="custom-radio-checkbox__show custom-radio-checkbox__show--radio--nino"
                ></span>
                <!-- Texto -->
                <span class="custom-radio-checkbox__text text-lg">Niño</span>
              </label>
            </p>
          </div>
          <div class="w-full mt-4">
            <label class="flex text-sm flex-col justify-start items-start w-full">
              <span class="mb-1"> Correo electrónico</span>
              <input
                ref="discover_letter_santa_name"
                v-model="email"
                class="placeholder-gray-800 bg-gray-200 input-modal__info w-10/12 mb-5 px-5 py-2"
                type="text"
                placeholder="ejemplo@gmail.com"
              />
            </label>
          </div>
          <p v-if="errorEmail" class="text-xs text-red-400">Ingrese un email válido.</p>
          <p v-if="errorGender" class="text-xs text-red-400">Falta el campo género.</p>
        </div>
        <div class="flex justify-center w-full mt-5">
          <button
            @click="onFinishedCartModalClose"
            class="text-xs md:text-lg text-center boton-modal__info bg-yellowcorp text-white py-2 px-1 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
          >
            Enviar
          </button>

          <button
            @click="onClickButtonExit"
            type="button"
            class="text-xs md:text-lg bg-pregned boton-modal__info text-white py-2 px-1 ml-4 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
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
import ButtonExit from "@/components/layout/ButtonExit";
import Boton from "../util/Boton";
import { NEWBORN, PREGNED, UNDER } from "@/types";

export default {
  components: {
    Modal,
    ButtonExit,
    Boton,
  },
  data() {
    return {
      errorEmail: false,
      errorGender: false,
    };
  },
  created() {
    let path = this.$route.fullPath;
    this.section = path.includes("newborn")
      ? NEWBORN
      : path.includes("pregned")
      ? PREGNED
      : UNDER;
  },

  computed: {
    gender: {
      get: function () {
        return this.$store.state.shopinglist.wishlist.gender;
      },
      set: function (gender) {
        /*         return this.$store.state.shopinglist.nameToSanta
         */
        this.$store.commit("shopinglist/setGender", gender);
      },
    },
    email: {
      get: function () {
        return this.$store.state.shopinglist.wishlist.email;
      },
      set: function (email) {
        /*         return this.$store.state.shopinglist.nameToSanta
         */
        this.$store.commit("shopinglist/setEmail", email);
      },
    },
  },
  methods: {
    async onFinishedCartModalClose() {
      if (this.onValidateFields()) {
        this.$store.commit("shopinglist/setisShopingCarListOk", false);
        this.$store.commit("shopinglist/sendLetter", this.section);
        this.$store.commit("shopinglist/setListItems", []);
      }
    },
    onClickButtonExit() {
      this.$store.commit("shopinglist/setisShopingCarListOk", false);
    },
    onValidateFields() {
      let isFormValid = true;
      this.clearErroFields();
      if (this.$store.state.shopinglist.wishlist.email === "") {
        this.errorEmail = true;
        isFormValid = false;
      }
      if (!this.pruebaemail(this.$store.state.shopinglist.wishlist.email)) {
        this.errorEmail = true;
        isFormValid = false;
      }
      if (this.$store.state.shopinglist.wishlist.gender === "") {
        this.errorGender = true;
        isFormValid = false;
      }
      return isFormValid;
    },
    pruebaemail(valor) {
      console.log("valor:", valor);
      let is = false;
      let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      if (!re.exec(valor)) {
        is = false;
      } else {
        is = true;
      }
      console.log(is);
      return is;
    },
    clearErroFields() {
      this.errorEmail = false;
      this.errorGender = false;
    },
  },
};
</script>

<style>
.modal__info {
  height: 90%;
}
.boton {
  min-width: 8rem;
  margin: 0.2rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
}
.img-modal__info {
  position: absolute;
  margin: auto;
  z-index: 1;
}

.finished__img {
  max-width: 100%;
}
.header-modal__info {
  height: 60%;
}
.footer-modal__info {
  height: 40%;
}

.input-modal__info {
  border-radius: 13pt;
}
.boton-modal__info {
  max-height: 3rem;
  padding: 0.5rem;
  min-width: 8rem;
  -webkit-box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.75);
}
/* Centra el input personalizado con el texto */
.custom-radio-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-family: arial;
}

/* Modificador para dar la imagen de radio */
.custom-radio-checkbox__show--radio--nino {
  background-image: url("../../assets/img/all/rbazul.svg");
}
.custom-radio-checkbox__show--radio--nina {
  background-image: url("../../assets/img/all/rbr.svg");
}

/* Oculta input original */
.custom-radio-checkbox > .custom-radio-checkbox__input {
  display: none;
}

/* Radio personalizado usando <span> */
.custom-radio-checkbox > .custom-radio-checkbox__show {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 0.5rem;
  background-size: cover;
}

/* Cambia el radio personalizado cuando es pulsado */
.custom-radio-checkbox
  > .custom-radio-checkbox__input:checked
  + .custom-radio-checkbox__show--radio {
  background-image: url("../../assets/img/all/rbrr.svg");
}
.custom-radio-checkbox
  > .custom-radio-checkbox__input:checked
  + .custom-radio-checkbox__show--radio--nina {
  background-image: url("../../assets/img/all/rbrr.svg");
}
.custom-radio-checkbox
  > .custom-radio-checkbox__input:checked
  + .custom-radio-checkbox__show--radio--nino {
  background-image: url("../../assets/img/all/rbrazul.svg");
}
</style>
