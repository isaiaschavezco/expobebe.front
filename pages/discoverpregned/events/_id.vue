<template>
  <div class="w-full m-auto pt-1 h-full overflow-y-scroll font-bogle lg:px-20">
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <img
        class="animate-spin w-12 h-12"
        src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/loading.svg"
        alt=""
        data-not-lazy
      />
    </div>
    <div
      v-if="!isPageLoading"
      class="flex flex-col md:grid h-full md:gap-5 lg:mt-6 lg:grid-cols-2"
    >
      <!-- EVENT VIDEO -->
      <div class="col-span-1 flex flex-col lg:rounded-lg video">
        <div class="w-full bc-EB0045-50 text-center">
          <div class="text-white p-2 text-sm md:text-base font-bold">
            {{ event.name }}
          </div>
        </div>
        <div class="w-full contenedor-video relative">
          <iframe
            :src="event.eventUrl"
            frameborder="0"
            allow="autoplay; fullscreen; encrypted-media;"
            class="test-frame frame-live absolute xl:relative"
            allowfullscreen
          />
        </div>
      </div>
      <!-- CHAT -->
      <div class="col-span-1 chat lg:ml-16">
        <div
          v-if="event.products.length > 0"
          class="w-full bc-0071CE flex justify-around items-center px-3 bg-orange-600"
        >
          <!-- <div v-if="true" class="w-full bc-0071CE flex justify-around items-center px-3 "> -->
          <button
            class="bg-teal-200 bg-opacity-25 rounded-full h-8 w-8 flex justify-center items-center"
            @click="onPreviousProductClicked"
          >
            <img
              class="h-4 w-4"
              src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/flecha-izquierda-white.svg"
              alt=""
              srcset=""
            />
          </button>
          <div class="w-full h-32 px-3">
            <hooper
              ref="discover_event_products"
              class="max-h-full"
              :items-to-show="2"
              :mouse-drag="false"
              :touch-drag="false"
              :wheel-control="false"
              :keys-control="false"
            >
              <slide
                v-for="(product, index) in event.products"
                :key="index"
                class="flex items-center"
                :index="index"
                @click.native="onProductClicked(product._id)"
              >
                <img
                  class="w-11/12 mx-auto rounded-xl h-24 shadow-xl"
                  :src="product.images[0]"
                />
              </slide>
            </hooper>
          </div>
          <button
            class="bg-teal-200 bg-opacity-25 rounded-full h-8 w-8 flex justify-center items-center"
            @click="onNextProductClicked"
          >
            <img
              class="h-4 w-4"
              src="https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/proximo-white.svg"
              alt=""
              srcset=""
            />
          </button>
        </div>

        <div
          v-if="chat"
          class="w-full chat overflow-y-scroll flex flex-col items-center pt-5"
        >
          <template v-for="message in chat.rows">
            <div
              :key="message._id"
              class="flex flex-col w-10/12 mt-3 py-2 px-2 rounded bc-3cb4e5-80 text-xs md:text-sm"
            >
              <span class="c-0082CB font-bold capitalize">{{ message.user.name }}</span>
              <p class="c-707070">
                {{ message.comment }}
              </p>
            </div>
          </template>
        </div>
      </div>

      <!-- FOOTER -->
      <div
        class="absolute bottom-0 left-0 w-full discover-event-chat-message-container h-20 py-2 px-3 flex items-center justify-end bc-FCBD1B"
      >
        <div class="flex lg:justify-end items-center w-full">
          <textarea
            ref="discover_event_chat_message"
            v-model="chatMessage"
            rows="2"
            class="resize-none h-10 text-white placeholder-white text-sm md:text-base bg-blueformjugueti text-area rounded-lg lg:px-2 py-2 px-3 w-4/5 lg:w-3/5"
            type="text"
            placeholder="Comenta"
          />
          <button
            class="bg-blueformjugueti hover:bg-blueformjugueti-dark w-24 lg:w-32 text-white lg:px-2 py-2 lg:py-3 lg:mr-20 ml-4 lg:ml-12 rounded-lg discover-event-height-fit text-sm md:text-base boton"
            @click="onMessageSend"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PREGNED } from "../../../types/index";

import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  layout: "circleheader",
  components: {
    Hooper,
    Slide,
  },
  data() {
    return {
      event: null,
      eventId: null,
      chat: null,
      chatMessage: "",
      chatUpdateController: null,
      isPageLoading: true,
    };
  },
  async created() {
    this.eventId = this.$route.params.id;
    this.getEventById(this.eventId);
    await this.getChatByEventId();
    this.initChatController();
  },
  mounted() {
    this.$store.commit("menu/setTitle", "En vivo");
    this.$store.commit("menu/setColor", "#FFB71B");
    this.$store.commit("menu/setCatalogState", false);
  },
  destroyed() {
    this.$store.commit("menu/setCatalogState", true);
    if (this.chatUpdateController) {
      clearInterval(this.chatUpdateController);
    }
  },
  methods: {
    async getEventById(eventId) {
      try {
        const { data } = await this.$api.event.getById(eventId, PREGNED);
        if (data.status.code === "0000") {
          this.event = data.result.event;
          this.sendCatalogNotification(this.event.name);
        }
      } catch (err) {
        console.log("Error: getEventById: ", err);
      }
      this.isPageLoading = false;
    },
    onMessageSend() {
      if (this.onValidateFields()) {
        this.sendMessage();
      }
    },
    onNextProductClicked() {
      this.$refs.discover_event_products.slideNext();
    },
    onPreviousProductClicked() {
      this.$refs.discover_event_products.slidePrev();
    },
    async getChatByEventId() {
      try {
        const { data } = await this.$api.chat.getByEvent(this.eventId);
        if (data.status.code === "0000") {
          this.chat = data.result.chat;
        }
      } catch (err) {
        console.log("getChatByEventId: ", err);
      }
    },
    async sendMessage() {
      try {
        console.log("ENVIO MENSAJE: ", this.chat);
        if (!this.chat) {
          console.log("NO EXISTE CHAT");
          const chatData = {
            eventId: this.eventId,
          };
          const { data } = await this.$api.chat.create(chatData);
          console.log("Response CHAT CREADO: ", data);
          await this.getChatByEventId();
          this.initChatController();
        }
        const chatId = this.chat._id;
        const chatData = {
          user: localStorage.getItem("_id"),
          comment: this.chatMessage,
        };
        console.log(chatData);
        const { data } = await this.$api.chat.addComment(chatId, chatData);
        console.log("Response MENSAJE ENVIADO: ", data);
        if (data.status.code === "0000") {
          this.getChatByEventId();
          this.chatMessage = "";
        }
      } catch (err) {
        console.log("sendMessage: ", err);
      }
    },
    onValidateFields() {
      let isFormValid = true;
      this.clearErroFields();
      if (this.chatMessage === "") {
        this.$refs.discover_event_chat_message.classList.add("error");
        isFormValid = false;
      }
      return isFormValid;
    },
    clearErroFields() {
      if (this.$refs.discover_event_chat_message.classList.contains("error")) {
        this.$refs.discover_event_chat_message.classList.remove("error");
      }
    },
    initChatController() {
      if (!this.chatUpdateController && this.chat) {
        this.chatUpdateController = setInterval(() => {
          this.getChatByEventId();
        }, 10000);
      }
    },
    onProductClicked(productId) {
      this.$router.push({
        name: "discover-toys-id",
        params: {
          id: productId,
        },
      });
    },
    async sendCatalogNotification(eventName) {
      const sectionData = {
        email: this.$store.state.user.userEmail,
        catalog: "EVENT",
        value: eventName,
      };
      await this.$api.utilities.viewCatalog(sectionData);
      // console.log('CATALOG: ', data)
    },
  },
};
</script>

<style scoped>
.test-frame {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.chat {
  overflow-y: scroll;
}

.contenedor-video {
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  position: relative;
}

.boton,
.text-area {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.boton:active {
  animation: push 0.3s;
}

.frame-live {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.chat::-webkit-scrollbar {
  display: none;
}

.h-50 {
  height: 50%;
}

.h-24vh {
  height: 24vh;
}

.test-back-blue-event {
  background-color: #3cb4e5;
}

.c-0082CB {
  color: #0082cb !important;
}

.c-707070 {
  color: #707070 !important;
}

.bc-0071CE {
  background: #0071ce !important;
}

.bc-3CB4E5 {
  background-color: #3cb4e5 !important;
}

.bc-FCBD1B {
  background-color: #fcbd1b !important;
}

.bc-3cb4e5-80 {
  background-color: rgba(60, 180, 229, 0.6);
}

.bc-EB0045-50 {
  background-color: rgba(235, 0, 69, 0.8);
}

.video {
  overflow: hidden;
  height: auto;
}

@media (min-width: 1024px) {
  .border-top {
    border-top: 4px dotted !important;
    padding-top: 30px;
    color: #3cb4e5;
  }

  .h-42vh {
    height: 42vh;
  }
}

.error {
  animation: shake 0.2s ease-in-out 0s 2;
  box-shadow: 0 0 0.5em #d1003d;
}

@keyframes shake {
  0% {
    margin-left: 0rem;
  }

  25% {
    margin-left: 0.5rem;
  }

  75% {
    margin-left: -0.5rem;
  }

  100% {
    margin-left: 0rem;
  }
}

@keyframes push {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  }

  60% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.5);
  }
}

.discover-event-height-fit {
  height: fit-content;
}

.discover-event-chat-message-container {
  border-top-left-radius: 25pt;
  border-top-right-radius: 25pt;
}
</style>
