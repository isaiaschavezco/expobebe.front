<template>
  <div
    v-if="isModalVisible"
    :class="opacity ? opacity : 'bg-opacity-50'"
    class="h-screen w-screen bg-black fixed top-0 left-0 z-index-plus flex justify-center items-center modal-component-blur"
    @click="onModalClicked"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    isModalVisible: Boolean,
    opacity: String,
  },
  methods: {
    onModalClicked() {
      this.$emit("onModalClick");
    },
  },
};
</script>

<style scoped>
.modal-component-blur {
  backdrop-filter: blur(6px);
}

.blur {
  filter: blur(1px);
}
</style>
