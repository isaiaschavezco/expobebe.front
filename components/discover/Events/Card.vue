<template>
  <div
    @click="functionClick(dataFunction)"
    :class="colorCard ? colorCard : 'bg-white'"
    class="md:w-3/12 cursor-pointer md:ml-4 card-event_ place-self-center card-rounded overflow-hidden shadow-xl mb-5 mx-auto exp"
  >
    <div
      v-if="this.status === 'En vivo'"
      class="text-white font-bold absolute px-3 rounded-full events-live-tag"
    >
      En vivo
    </div>
    <div :class="colorCard ? colorCard : 'bg-white'" class="h-3/5 card-event_">
      <img
        class="w-full h-full border-bottom-left-radius"
        :src="this.urlImage"
        :alt="this.alt"
      />
    </div>
    <div class="flex justify-between leading-6 p-4 h-2/5">
      <div class="font-bold text-xs xl:text-lg text-white capitalize">
        {{ title }}
      </div>
      <div class="text-xs xl:text-lg ml-2 text-white uppercase">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    functionClick: Function,
    dataFunction: String,
    urlImage: String,
    alt: String,
    title: String,
    subtitle: String,
    status: String,
    colorCard: String,
  },
  created() {
    console.log(this.colorCard);
  },
};
</script>

<style scoped>
.card-event_ {
  min-width: 15rem;
  max-width: 18rem;
  min-height: 15rem;
  max-height: 30rem;
}
.border-bottom-left-radius {
  border-bottom-left-radius: 30pt 30pt;
}
</style>
