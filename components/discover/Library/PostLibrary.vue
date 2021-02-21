<template>
  <div
    class="w-full cursor-pointer mt-5 card-library card-rounded ml-3"
    :class="colorCard ? colorCard : 'bg-white'"
    @click="mostrarModal"
  >
    <div class="header__postlibrary border-bottom-left-radius overflow-hidden">
      <img
        :src="this.urlThumnail"
        :alt="title"
        class="border-bottom-left-radius imagen-library"
        v-lazy-load
        loading="lazy"
      />
    </div>
    <div
      class="footer__postlibrary text-white bottom-0 w-full rounded text-base lg:text-base py-5 bg-opacity-50 text-left pl-5 font-bold flex items-center"
    >
      <h3>{{ title }}</h3>
    </div>
    <!-- evita que se reproduzca el video -->
  </div>
</template>

<script>
export default {
  props: {
    urlThumnail: String,
    urlVideo: String,
    title: String,
    colorCard: String,
    functionVideo: Function,
  },
  methods: {
    mostrarModal() {
      this.functionVideo(true, this.urlVideo, this.title);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.card-library {
  border-radius: 30pt 30pt;
  height: 100%;
  max-height: 18rem;
  max-width: 18rem;
  min-width: 18rem;
  min-height: 18rem;
  overflow: hidden;
  align-self: center;
  justify-self: center;
}

@media screen and (min-width: 768px) {
  .header__postlibrary {
    height: 75%;
    max-height: 13rem;
  }
  .footer__postlibrary {
    height: 25%;
  }
}
.header__postlibrary {
  height: 75%;
  max-height: 13rem;
}
.footer__postlibrary {
  height: 25%;
}

.borde-disimulado {
  border: solid 1px rgba(0, 0, 0, 0.0001);
}

.imagen-library {
  object-fit: cover;
  filter: contrast(0.8);
  width: 100%;
  max-width: 100%;
}
.border-bottom-left-radius {
  border-bottom-left-radius: 30pt 30pt;
}
</style>
