<template>
  <div
    :class="colorCard ? colorCard : 'bg-white'"
    class="w-full mt-5 md:mt-0 border border-solid card card-rounded"
    @click="mostrarModal"
  >
    <div
      class="relative mx-auto flex flex-col items-center justify-end card rounded-lg z-0 precarga"
    >
      <img
        :src="this.urlThumnail"
        :alt="title"
        class="w-full border-bottom-left-radius imagen border-show"
        v-lazy-load
        loading="lazy"
      />
      <div
        class="bottom-0 text-white w-full rounded text-base lg:text-base py-4 bg-opacity-50 text-left pl-5 font-bogle flex items-center"
      >
        <h3>{{ title }}</h3>
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
    colorCard: String,
    functionVideo: Function,
  },
  methods: {
    mostrarModal() {
      this.functionVideo(true, this.urlVideo, this.title);
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
  border-radius: 30pt 30pt;
  max-height: 20rem;
  max-width: 20rem;
  overflow: hidden;
  align-self: center;
  justify-self: center;
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
.border-bottom-left-radius {
  border-bottom-left-radius: 30pt 30pt;
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
