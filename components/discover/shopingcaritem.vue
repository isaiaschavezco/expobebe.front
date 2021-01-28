<template>
  <div class="flex my-1 shopingList_item_border w-10/12 mx-auto pt-3 my-3">
    <div class="w-2/6 flex-1 mr-3 rounded">
      <img
        class="shopingList_item_image rounded"
        :src="item.urlThumbnail"
        alt="nombre del juguete"
      />
    </div>
    <div
      class="w-auto flex flex-col items-center justify-center flex-1 text-xs capitalize text-grayjugueti font-bold shopingList_text"
    >
      <div class="text-sm md:text-lg lg:text-base flex-1 text-left">
        <h3>{{ item.name.slice(0, 30) }} sda</h3>
      </div>
      <div class="flex w-full justify-end items-center h-full text-grayjugueti">
        <button
          class="sm:text-lg mt-5 md:text-lg flex shopingList_text"
          @click="deleteItem"
        >
          Eliminar
          <img
            src="../../assets/img/trash.svg"
            class="w-4 ml-2"
            alt="Eliminar Producto"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.shopingList_item_image {
  object-fit: cover;
  width: 90%;
  max-width: 10rem;
  /* max-width:12rem; */
  margin: auto;
}

.shopingList_item_border {
  border-top: solid 2px #3cb4e5;
}
</style>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    deleteItem() {
      console.log("id del item:", this.item._id);
      this.$store.commit("shopinglist/deleteItem", this.item._id);
    },
  },
};
</script>
