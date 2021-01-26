<template>
  <!-- <Modal v-if="true" :is-modal-visible="true"  @click="onModalClicked"> -->
  <Modal v-if="true" :is-modal-visible="true" @click="this.closeFunction">
    <div
      class="bg-white w-full mx-2 md:w-4/6 lg:w-5/6 xl:w-3/6 h-3/6 card-product relative p-3"
      :class="this.show360 ? 'card-product-360' : 'card-product'"
    >
      <BotonClose color="text-graycorp " :funcion="this.closeFunction" />
      <div class="header_cardproduct w-100 flex justify-left items-center">
        <h3 class="text-graycorp font-semibold text-lg ml-4">
          {{ product.name.slice(0, 30) }}
        </h3>
      </div>
      <div class="body_cardproduct w-100 flex flex-col md:flex-row">
        <div
          :class="this.show360 ? 'animation__modalproduct-show' : ''"
          class="md:h-full box-border h-50 w-full md:w-3/6 flex justify-center"
        >
          <div class="precarga img_cardproduct relative overflow-hidden w-11/12">
            <img
              class="object-contain h-full w-full box-border"
              :src="product.images[0]"
            />
            <img
              :class="this.show360 ? 'opacity-50' : ''"
              class="absolute button__360 cursor-pointer w-10 h-10 xl:w-12 xl:h-12"
              src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/btn_360.png"
              alt=""
              @click="onShow360"
            />
          </div>
        </div>
        <div
          :class="this.show360 ? 'animation__hide' : ''"
          class="text__cardproduct text-xs md:text-sm lg:text-lg object-cover h-full box-border w-full md:w-2/6 mx-auto invisible-scrollbar overflow-y-scroll"
        >
          {{ product.description.slice(0, 1000) }}
        </div>
      </div>
      <div
        class="footer__cardproduct w-full flex justify-center md:justify-end items-center md:pr-20"
      >
        <a
          @click="onClickShop"
          :href="product.shopUrl"
          class="text-lg text-center bg-yellowcorp w-6/12 md:w-2/6 text-white py-2 px-1 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
        >
          Comprar
        </a>
        <button
          v-if="!this.productExist"
          @click="onClickAdd"
          type="button"
          class="text-lg bg-graycorp w-6/12 md:w-2/6 text-white py-2 px-1 ml-4 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
        >
          Agregar
        </button>
        <button
          v-if="this.productExist"
          @click="onCheckShopingList"
          type="button"
          class="text-lg bg-graycorp w-6/12 md:w-2/6 text-white py-2 px-1 ml-4 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
        >
          Revisar carrito
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/modal";
import BotonClose from "@/components/layout/ButtonExit";

export default {
  components: {
    Modal,
    BotonClose,
  },
  props: {
    product: Object,
    closeFunction: Function,
  },
  data() {
    return {
      show360: false,
      productExist: false,
    };
  },

  created() {
    this.$store.commit("shopinglist/existProduct", this.product._id);
    console.log("this.products", this.product);
  },
  mounted() {
    console.log(this.$store.state.shopinglist.existInCar);
    this.productExist = this.$store.state.shopinglist.existInCar;
  },
  methods: {
    onShow360() {
      this.show360 = !this.show360;
    },
    onClickAdd() {
      this.$store.commit("shopinglist/addItem", this.product);
      this.productExist = true;
    },
    onCheckShopingList() {
      this.$store.commit("shopinglist/toggleShopingCarListVisible");
      this.closeFunction();
    },
    onClickShop() {},
  },
};
</script>

<style scoped>
.card-product {
  height: 60%;
  border-radius: 20pt;
}
.card-product-360 {
  height: 80%;
  border-radius: 20pt;
}
.header_cardproduct {
  height: 15%;
}
.body_cardproduct {
  height: 70%;
}
.footer__cardproduct {
  height: 15%;
}
.text__cardproduct {
  height: 80%;
}
.img_cardproduct {
  height: 80%;
  border-radius: 15pt;
  -webkit-box-shadow: 0px 2px 20px -15px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 20px -15px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 20px -15px rgba(0, 0, 0, 0.75);
}
.animation__hide {
  animation-name: hide;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}
.animation__modalproduct-show {
  animation-name: show;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  border-radius: 10pt;
}
.button__360 {
  bottom: 0;
  left: calc(50% - 1rem);
}

.button__360:hover {
  transform: scale(1.1);
}
@keyframes hide {
  100% {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
@keyframes show {
  100% {
    width: 100%;
    height: 80%;
  }
}
</style>
