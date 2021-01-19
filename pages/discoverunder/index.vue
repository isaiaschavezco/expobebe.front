<template>
  <div class="w-full flex items-center overflow-y-scroll contenedor">
    <ShopingCardList v-if="shopingCarListStatus" />
    <ModalFinishedCart />
    <ModalSantaVideo v-if="isSantaVideoModalShown" />
    <div class="flex justify-center items-center px-5 lg:px-10 w-full h-full mb-10 pb-10">
      <div
        class="flex items-center flex-col md:flex-row lg:flex lg:justify-center w-full pb-10"
      >
        <div
          class="custom-card-descubre flex-shrink rounded"
          @click="onClickBrandsSection"
        >
          <img
            class="mb-5 w-full p-5 lg:p-8"
            src="@/assets/img/small/oso.png"
            alt="Juguetes"
          />
          <div
            class="title-section border-top-right-radius text-white w-6/12 rounded text-xl py-2 font-extrabold"
            data-not-lazy
          >
            Juguetes
          </div>
        </div>

        <div
          class="custom-card-descubre flex-shrink rounded"
          @click="onClickEventsSection"
        >
          <img
            class="mb-5 w-full p-5 lg:p-10 h-full"
            src="@/assets/img/all/calendar.svg"
            alt="Eventos"
            data-not-lazy
          />
          <div
            class="title-section text-white w-6/12 rounded text-xl py-2 font-extrabold border-top-right-radius"
          >
            Eventos
          </div>
        </div>
        <div
          class="custom-card-descubre flex-shrink rounded"
          @click="onClickLibrarySection"
        >
          <img
            class="mb-5 w-full p-5 lg:p-10 h-full"
            src="@/assets/img/library.svg"
            alt="Biblioteca"
            data-not-lazy
          />
          <div
            class="title-section text-white w-6/12 rounded text-xl py-2 font-extrabold border-top-right-radius"
          >
            Biblioteca
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopingCardList from "@/components/discover/shopingcardlist";
import ModalFinishedCart from "@/components/discover/ModalFinishedCart";
import ModalSantaVideo from "@/components/discover/ModalSantaVideo";

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
    this.$store.commit("menu/setTitle", "Descubre");
    this.$store.commit("menu/setColor", "#FFB71B");
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
        name: "discoverunder-brands",
      });
    },
    onClickEventsSection() {
      this.$router.push({
        name: "discoverunder-events",
      });
    },
    onClickLibrarySection() {
      console.log("Library");
      this.$router.push({
        name: "discoverunder-library",
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

.custom-card-descubre {
  cursor: pointer;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3cb4e5;
  margin-top: 1rem;
  padding: 1rem;
  max-width: 25rem;
  width: 17rem;
  max-height: 25rem;
  height: 17rem;
  text-align: center;
  border-radius: 1em;
  box-shadow: 0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.5);
}

.border-top-right-radius {
  border-top-right-radius: 15pt;
}

.custom-card-descubre:active {
  animation: push 0.1s;
}

@media (min-width: 719px) {
  .custom-card-descubre {
    margin: 1rem;
    max-width: 20rem;
    width: 20rem;
    max-height: 20rem;
    height: 20rem;
  }

  .contenedor {
    height: 100%;
    padding-top: 0;
  }

  .margin {
    padding-top: 5em;
  }
}

@media (min-width: 1200px) {
  .custom-card-descubre {
    margin: 1rem;
    max-width: 30rem;
    width: 20rem;
    max-height: 30rem;
    height: 20rem;
  }
}

.title-section {
  position: absolute;
  background-color: #ffb71b;
  bottom: 0;
  left: 0;
  text-shadow: 0px 3pt 6pt #00000029;
}

@keyframes push {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  }

  60% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.5);
  }
}
</style>
