<template>
  <div
    :class="colorCard ? colorCard : 'bg-white'"
    class="custom-card-descubre flex-shrink rounded min-w-full"
    @click="this.function"
  >
    <div class="p-5 lg:p-8 header__cardsection">
      <img
        class="preload mb-5 w-full object-cover img__cardsection"
        :src="urlImage"
        :alt="alt"
      />
    </div>
    <div
      :class="colorButton ? colorButton : 'bg-bluenewborn'"
      class="title-section__cardsection border-top-right-radius text-white w-9/12 text-2xl py-3 font-bold"
      data-not-lazy
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    function: Function,
    urlImage: String,
    alt: String,
    title: String,
    colorButton: String,
    colorCard: String,
  },

  methods: {},
};
</script>

<style>
.img__cardsection {
}
@media (min-width: 600px) {
}
@media (min-width: 768px) {
  .custom-card-descubre {
    margin: 1rem;
    min-width: 20rem;
    width: 20rem;
    max-height: 20rem;
    height: 20rem;
  }
}

@media (min-width: 992px) {
  .custom-card-descubre {
    margin: 1rem;
    min-width: 25rem;
    width: 25rem;
    max-height: 25rem;
    height: 25rem;
  }
}
@media (min-width: 1200px) {
}

.custom-card-descubre {
  cursor: pointer;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding: 2rem;
  text-align: center;
  border-radius: 18%;
  -webkit-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);

  min-width: 18rem;
  width: 18rem;
  max-height: 18rem;
  height: 18rem;
}
.header__cardsection {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-section__cardsection {
  position: absolute;
  height: 20%;
  bottom: 0;
  left: 0;
  color: white;
}
.border-top-right-radius {
  border-top-right-radius: 30pt;
}
</style>
