<template>
  <div class="w-11/12 lg:w-9/12 modal_container bg-white card-rounded overflow-hidden">
    <!--Header-->
    <div
      :class="colorCard ? colorCard : 'bg-white'"
      class="video-header relative text-white w-full h-1/6 p-2"
    >
      <h3 class="ml-8 lg:text-2xl font-semibold">{{ title }}</h3>
    </div>
    <div class="lg:p-4 flex flex-wrap md:flex-row h-full">
      <!-- Mitad derecha - Video -->
      <!-- <div class="w-full xl:w-7/12 h-full bg-black"> -->
      <div class="w-full xl:w-7/12">
        <div class="contenedor-video precarga">
          <iframe :src="urlVideo" class="frame"></iframe>
        </div>
      </div>

      <!-- Mitad izquierda - chat -->
      <!-- <div class="w-full xl:w-5/12 pl-8 bg-red-600 box-border container__social-chat"> -->
      <div class="w-full xl:w-5/12 xl:pl-8 box-border flex flex-col items-center">
        <Chat v-if="chat" :chat="chat" />
        <div class="flex items-center pt-1 xl:mt-5 w-full chat buttons__chat">
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
      this.message = null;
    },
  },
  created() {
    this.$store.commit("menu/validateTypeScreen");

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
  height: auto;
}
@media screen and (max-width: 1200px) {
  .modal_container {
    height: 90%;
  }
  .buttons__chat {
    height: 30%;
  }
}
@media screen and (min-width: 768px) {
  .frame {
    border-radius: 10pt;
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
  height: auto;
}
.input__social-chat {
  border-radius: 10pt;
  border: none;
  min-height: 2.5rem;
}
.button__social-chat {
  border-radius: 15pt;
  min-height: 2.5rem;
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
.error__social-chat {
  border: solid 1px rgba(255, 30, 9, 0.3);
}
</style>
