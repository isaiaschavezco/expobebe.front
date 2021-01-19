<template>
  <div
    class="w-full mt-5 md:mt-0 border border-solid card h-48 md:h-64 shadow-lg"
    @click="mostrarModal"
  >
    <div
      class="relative mx-auto flex flex-col items-center justify-end card h-48 md:h-64 rounded-lg z-0"
    >
      <img
        :src="this.urlThumnail"
        :alt="title"
        class="w-full imagen border-show"
        v-lazy-load
        loading="lazy"
      />
      <div
        class="absolute bottom-0 z-50 texto text-white w-full rounded text-base lg:text-base py-2 bg-yellowjugueti bg-opacity-50 text-left pl-5 font-bogle"
      >
        {{ title }}
      </div>
      <!-- evita que se reproduzca el video -->
      <div class="absolute inset-0 cursor-pointer" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urlThumnail: String,
    urlVideo: String,
    title: String,
  },
  methods: {
    mostrarModal() {
      // this.$store.commit('discover/setIsModalVideoLibraryVisible', true)
      // this.$store.commit('discover/setCurrentModalVideoLibraryUrl', this.urlVideo)
      this.$store.commit("discover/setIsModalVideoLibraryVisible", true);
      this.$store.commit("discover/setCurrentModalVideoLibraryUrl", this.urlVideo);
      this.$store.commit("discover/say", " #F5213A");
      console.log("CLICK");
    },
  },
};
</script>

<style>
.test-frame {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card {
  border-radius: 10pt;
  max-height: 20rem;
  max-width: 20rem;
  overflow: hidden;
  align-self: center;
  justify-self: center;
}

.texto {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}
.borde-disimulado {
  border: solid 1px rgba(0, 0, 0, 0.0001);
}

.imagen {
  vertical-align: middle;
  margin: auto;
  margin-left: auto;
  margin-right: auto;
  filter: contrast(0.8);
}

@keyframes push {
  0% {
    transform: scale(1);
  }

  60% {
    transform: scale(0.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
