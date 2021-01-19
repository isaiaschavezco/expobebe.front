<template>
  <div class="w-full flex items-center overflow-y-scroll contenedor">
    <ShopingCardList v-if="shopingCarListStatus" />
    <ModalFinishedCart />
    <ModalSantaVideo v-if="isSantaVideoModalShown" />
    <div class="flex justify-center items-center px-5 lg:px-10 w-full h-full mb-10 pb-10">
      <div
        class="flex items-center flex-col md:flex-row flex-wrap lg:flex lg:justify-center w-full pb-10"
      >
        <CardSection
          :function="onClickBrandsSection"
          urlImage="@/assets/img/all/calendar.svg"
          alt="Eventos"
          title="Productos"
        />
        <CardSection
          :function="onClickEventsSection"
          urlImage="@/assets/img/all/calendar.svg"
          alt="Eventos"
          title="Eventos"
        />
        <CardSection
          :function="onClickLibrarySection"
          urlImage="@/assets/img/all/calendar.svg"
          alt="Eventos"
          title="Biblioteca"
        />
        <CardSection
          :function="onClickLibrarySection"
          urlImage="@/assets/img/all/calendar.svg"
          alt="Blog"
          title="Blog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";
import CardSection from "@/components/discover/Brands/CardSection";

export default {
  head() {
    return {
      link: [
        {
          rel: "preload",
          href: "@/assets/img/oso.svg",
          as: "image",
        },
        {
          rel: "preload",
          href:
            "https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/calendar.svg",
          as: "image",
        },
        {
          rel: "preload",
          href: "@/assets/img/library.svg",
          as: "image",
        },
      ],
    };
  },
  components: {
    ShopingCardList,
    ModalFinishedCart,
    ModalSantaVideo,
  },
  data() {
    return {};
  },
  computed: {
    shopingCarListStatus() {
      return this.$store.state.shopinglist.isShopingCarListVisible;
    },
    isSantaVideoModalShown() {
      return this.$store.state.shopinglist.isSantaVideoModalShown;
    },
  },
  watch: {},
  layout: "circleheader",
  created() {
    this.sendViewSectionNotification();
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Categorías");
    this.$store.commit("menu/setColor", "rgb(147, 203, 228)");
    this.$store.commit("menu/setButtonShopingCarVisible", true);
    if (process.client) {
      this.$fire.analytics.logEvent("notification_received");
      console.log("Se ha hecho un analityc");
      console.log(this.$fire);
      console.log(this.$fire.analytics);
    }
    const h = document.getElementsByClassName("test-menu");
    const l = document.getElementsByTagName("iframe");
  },
  methods: {
    onClickBrandsSection() {
      this.$router.push({
        name: "discovernewborn-brands",
      });
    },
    onClickEventsSection() {
      this.$router.push({
        name: "discovernewborn-events",
      });
    },
    onClickLibrarySection() {
      console.log("Library");
      this.$router.push({
        name: "discovernewborn-library",
      });
    },
    async sendViewSectionNotification() {
      const sectionData = {
        email: localStorage.getItem("email"),
        section: "Descubre",
      };
      const { data } = await this.$api.utilities.viewSection(sectionData);
    },
  },
};
</script>

<style>
.contenedor {
  height: 100%;
  padding-top: 30em;
}

.custom-card-descubre:active {
  animation: push 0.1s;
}
.contenedor {
  height: 100%;
  padding-top: 0;
}

.margin {
  padding-top: 5em;
}
</style>
