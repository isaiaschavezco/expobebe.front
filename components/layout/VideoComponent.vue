<template>
  <div class="w-11/12 lg:w-8/12 modal_container bg-white card-rounded overflow-hidden">
    <div
      :class="colorCard ? colorCard : 'bg-white'"
      class="video-header relative text-white w-full h-1/6 p-4"
    >
      <h3 class="ml-8 lg:text-2xl font-semibold">{{ title }}</h3>
      <button
        class="absolute top-0 right-0 mt-4 mr-10 font-bold h-6 w-6 flex items-center justify-center text-white shopingList_burguer-button"
        @click="closeFunction"
      >
        <p class="place-self-center">&times;</p>
      </button>
    </div>
    <div class="lg:p-4">
      <div class="contenedor-video precarga">
        <!-- <iframe width="560" height="315" :src="urlVideo" class="frame"></iframe> -->
        <iframe :src="urlVideo" class="frame"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeFunction: Function,
    urlVideo: String,
    title: String,
    colorCard: String,
  },
  created() {
    console.log("currentVideoUrl", this.urlVideo);
  },
};
</script>

<style>
@media screen and (min-width: 768px) {
  .modal_container {
    border-radius: 0;
    height: auto;
  }
  .frame {
    border-radius: 10pt;
  }
}

.modal_container {
  height: auto;
  border-radius: 13pt;
  margin: auto;
}
.video-header {
  -webkit-box-shadow: 0px 2px 33px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 33px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 33px -17px rgba(0, 0, 0, 0.75);
}
.contenedor-video {
  height: 0px;
  width: 100%;
  padding-bottom: 56.25%; /* Relación: 16/9 = 56.25% */
  position: relative;
}

.frame {
  margin-top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0;
}
</style>
