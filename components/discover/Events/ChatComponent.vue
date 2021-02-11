<template>
  <div
    v-if="chat"
    id="chat"
    class="chat__container w-full flex flex-col items-center md:pt-5 overflow-y-scroll invisible-scrollbar bg-gray-100 p-1 xl:p-2"
  >
    <Message
      v-for="message in mensajesInvertidos"
      :key="message._id"
      :message="message"
    />
  </div>
</template>

<script>
import Message from "@/components/discover/Events/ChatMessage";

export default {
  components: {
    Message,
  },
  props: {
    chat: Object,
  },
  created() {},
  computed: {
    mensajesInvertidos() {
      let revertido = this.chat.rows.reverse();
      return revertido;
    },
  },
};
</script>

<style>
.chat__container {
  height: 70%;
  max-height: 70%;
  overflow-y: scroll;
  border-radius: 10pt;
}

@media screen and (max-width: 1200px) {
  .chat__container {
    border-radius: 0pt;
    height: 50%;
    max-height: 50%;
  }
}
</style>
