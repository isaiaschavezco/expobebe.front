<template>
  <div class="w-full bg-white message_chat box-border p-1 xl:p-2 mt-1 md:mt-3">
    <h3 class="message-title__chat text-xs font-semibold text-gray-700">usuario</h3>
    <p class="message__chat text-xs text-gray-600">
      {{ mensaje.comment }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },
  computed: {
    mensaje() {
      return this.message ? this.message : " nooo";
    },
  },
};
</script>

<style scoped>
.message_chat {
  border-radius: 10pt;
  -webkit-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 29px -17px rgba(0, 0, 0, 0.75);
  animation-name: newmessage;
  animation-iteration-count: 1;
  animation-duration: 1s;
}
@media screen and (max-width: 768px) {
  .message__chat {
    font-size: 0.6rem;
  }
  .message-title__chat {
    font-size: 0.65rem;
  }
}

@keyframes newmessage {
  50% {
    -webkit-box-shadow: 0px -6px 59px -28px rgba(255, 183, 27, 0.67);
    -moz-box-shadow: 0px -6px 59px -28px rgba(255, 183, 27, 0.67);
    box-shadow: 0px -6px 59px -28px rgba(255, 183, 27, 0.67);
  }
  100% {
    border: none;
  }
}
</style>
