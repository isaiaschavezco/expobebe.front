<template>
  <div class="w-full h-full flex items-center overflow-y-scroll mb-10">
    <ShopingCardList v-if="shopingCarListStatus" />
    <ModalFinishedCart v-if="isFinishedCartModalShown" />
    <ModalSantaVideo v-if="isSantaVideoModalShown" />
    <div class="flex flex-wrap justify-center items-center px-5 lg:px-10 w-full h-full">
      <CardSection
        :function="onClickBrandsSection"
        urlImage="https://expobebe.fra1.digitaloceanspaces.com/ilu_productos.png"
        alt="Eventos"
        title="Productos"
        :colorButton="'bg-' + this.principalColor"
      />
      <CardSection
        :function="onClickEventsSection"
        urlImage="https://expobebe.fra1.digitaloceanspaces.com/ilu_eventos.png"
        alt="Eventos"
        title="Eventos"
        :colorButton="'bg-' + this.principalColor"
      />
      <CardSection
        :function="onClickLibrarySection"
        urlImage="https://expobebe.fra1.digitaloceanspaces.com/ilu_biblio.png"
        alt="Eventos"
        title="Biblioteca"
        :colorButton="'bg-' + this.principalColor"
      />
      <CardSection
        :function="onClickBlogSection"
        urlImage="https://expobebe.fra1.digitaloceanspaces.com/ilu_blog.png"
        alt="Blog"
        title="Blog"
        :colorButton="'bg-' + this.principalColor"
      />
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";
import CardSection from "@/components/discover/Brands/CardSection";
import { NEWBORN, UNDER, PREGNED } from "@/types/";
export default {
  layout: "circleheader",
  components: {
    ShopingCardList,
    ModalFinishedCart,
    ModalSantaVideo,
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isSantaVideoModalShown() {
      return this.$store.state.shopinglist.isSantaVideoModalShown;
    },
    isFinishedCartModalShown() {
      // Solo se mostrará si se está ok  con los articulos del carrito
      return this.$store.state.shopinglist.isShopingCarListOk;
    },
  },
  created() {
    this.$store.commit("menu/validateTypeScreen");

    this.typeScreen = this.$store.state.menu.currentSection;
    // alert(this.typeScreen)
    this.principalColor =
      this.typeScreen === NEWBORN
        ? "bluenewborn"
        : this.typeScreen === UNDER
        ? "under"
        : "pregned";
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Categorías");
    this.$store.commit("menu/setColor", "bg-" + this.principalColor);
  },
  methods: {
    onClickBrandsSection() {
      this.$router.push({
        name: "newborn-brands",
        params: {
          typeScreen: this.typeScreen,
        },
      });
    },
    onClickEventsSection() {
      this.$router.push({
        name: "newborn-events",
        params: {
          typeScreen: this.typeScreen,
        },
      });
    },
    onClickLibrarySection() {
      console.log("Library");
      this.$router.push({
        name: "newborn-library",
        params: {
          typeScreen: this.typeScreen,
        },
      });
    },
    onClickBlogSection() {
      const win = window.open(`https://vivirmejor.mx/contigo-en-cada-etapa/`, "_blank");
      win.focus();
    },
  },
};
</script>

<style></style>
