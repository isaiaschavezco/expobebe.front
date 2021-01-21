<template>
  <div class="w-11/12 lg:w-9/12 modal_container bg-white card-rounded overflow-hidden">
    <!--Header-->
    <div
      :class="colorCard ? colorCard : 'bg-white'"
      class="video-header relative text-white w-full h-1/6 p-2"
    >
      <h3 class="ml-8 lg:text-2xl font-semibold">{{ title }}</h3>
    </div>

    <div class="lg:p-4 flex flex-col md:flex-row h-full">
      <div class="w-full md:w-7/12 h-full">
        <div class="contenedor-video precarga">
          <iframe :src="urlVideo" class="frame"></iframe>
        </div>
      </div>
      <div class="w-full md:w-5/12 pl-8 box-border container__social-chat">
        <Chat v-if="chat" :chat="chat" />
        <div class="flex mt-5">
          <input
            class="bg-gray-100 input__social-chat w-8/12 p-3 m-1 box-border font-semibold"
            :class="error ? 'error__social-chat' : ''"
            type="text"
            placeholder="Escríbenos tus comentarios"
            v-model="message"
          />
          <button
            :class="loading ? 'animate-pulse' : ''"
            class="bg-yellowcorp card-rounded button__social-chat text-white m-1 p-1 box-border w-4/12 font-semibold"
            @click="sendMessage"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "@/components/discover/Events/ChatComponent";

export default {
  components: {
    Chat,
  },
  data() {
    return {
      message: "",
    };
  },
  props: {
    closeFunction: Function,
    urlVideo: String,
    title: String,
    colorCard: String,
    chat: Object,
    onMessageSend: Function,
    errorMessage: false,
    error: false,
    loading: false,
  },
  computed: {},
  methods: {
    async sendMessage() {
      if (!this.message || this.message === "") {
        this.error = true;
        return;
      }
      this.loading = true;
      let response = await this.onMessageSend(this.message);
      this.loading = false;
      alert(response);
      if (response) {
      }
      this.message = null;
    },
  },
  created() {
    console.log("------------------");
    console.log(this.chat);
  },
};
</script>

<style>
input::before,
input::after {
  border: none;
}
.modal_container {
  border-radius: 13pt;
  margin: auto;
  margin-top: 5%;
  height: 70%;
}
@media screen and (max-width: 768px) {
  .modal_container {
    height: 90%;
  }
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
.container__social-chat {
  height: 100%;
}
.input__social-chat {
  border-radius: 10pt;
  border: none;
}
.button__social-chat {
  border-radius: 15pt;
}
.frame {
  margin-top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0;
  border-radius: 10pt;
}
.error__social-chat {
  border: solid 1px rgba(255, 30, 9, 0.3);
}
</style>
