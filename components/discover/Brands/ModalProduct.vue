<template>
  <!-- <Modal v-if="true" :is-modal-visible="true"  @click="onModalClicked"> -->
  <Modal v-if="true" :is-modal-visible="true" @click="this.closeFunction">
    <div
      class="bg-white w-full mx-2 md:w-4/6 lg:w-5/6 xl:w-3/6 h-3/6 card-product relative p-3"
    >
      <BotonClose color="text-graycorp " :funcion="this.closeFunction" />
      <div class="header_cardproduct w-100 flex justify-left items-center">
        <h3 class="text-graycorp font-semibold text-lg ml-4">
          {{ product.name.slice(0, 30) }}
        </h3>
      </div>
      <div class="body_cardproduct w-100 flex flex-col md:flex-row">
        <div class="md:h-full box-border h-50 w-full md:w-3/6 flex justify-center">
          <div class="precarga card-rounded img_cardproduct overflow-hidden w-11/12">
            <img class="object-cover h-full w-full box-border" :src="product.images[0]" />
          </div>
        </div>
        <div
          class="text__cardproduct text-xs md:text-sm lg:text-lg object-cover h-full box-border w-full md:w-2/6 mx-auto invisible-scrollbar overflow-y-scroll"
        >
          Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente
          texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del
          Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de
          2000 años de antiguedad. Richard McClintock, un profesor de Latin de la
          Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más
          oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al
          seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem
          Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et
          Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes
          de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el
          Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..",
          viene de una linea en la sección 1.10.32 El trozo de texto estándar de Lorem
          Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados.
          Las secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero
          son también reproducidas en su forma original exacta, acompañadas por versiones
          en Inglés de la traducción realizada en 1914 por H. Rackham.
          ----------------------------------
          {{ product.description.slice(0, 1000) }}
        </div>
      </div>
      <div
        class="footer__cardproduct w-full flex justify-center md:justify-end items-center md:pr-20"
      >
        <button
          type="button"
          class="text-lg bg-yellowcorp w-6/12 md:w-2/6 text-white py-2 px-1 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
        >
          Comprar</button
        ><button
          type="button"
          class="text-lg bg-graycorp w-6/12 md:w-2/6 text-white py-2 px-1 ml-4 hover:bg-bluenewborn shadow-lg font-semibold hover:text-white hover:border-transparent rounded-2xl"
        >
          Agregar
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
  created() {
    console.log(this.product, this.closeFunction);
  },
};
</script>

<style scoped>
.card-product {
  height: 60%;
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
}
</style>
