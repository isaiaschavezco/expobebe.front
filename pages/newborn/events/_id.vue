<template>
  <div class="w-full m-auto pt-1 h-full overflow-y-scroll font-bogle lg:px-20">
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <div class="preloader"></div>
    </div>
    <div
      v-if="!isPageLoading"
      class="flex container-events h-full lg:px-20 lg:pt-10 items-center"
    >
      <SocialComponent
        :title="this.event.name"
        :colorCard="principalColor"
        :urlVideo="this.event.eventUrl"
        :chat="chat"
        :onMessageSend="onMessageSend"
      />
    </div>
  </div>
</template>

<script>
import { NEWBORN, UNDER, PREGNED } from "@/types/";
import SocialComponent from "@/components/discover/Events/SocialComponent";
export default {
  layout: "circleheader",
  components: {
    SocialComponent,
  },
  data() {
    return {
      event: null,
      eventId: null,
      chat: null,
      chatUpdateController: null,
      isPageLoading: true,
    };
  },
  computed: {
    principalColor() {
      return this.$store.state.menu.currentSection === NEWBORN
        ? "bg-bluenewborn"
        : this.typeScreen === UNDER
        ? "bg-under"
        : "bg-pregned";
    },
  },
  async created() {
    this.$store.commit("menu/validateTypeScreen");
    this.typeScreen = this.$store.state.menu.currentSection;
    this.eventId = this.$route.params.id;
    this.getEventById(this.eventId);
    await this.getChatByEventId();
    this.initChatController();
  },
  mounted() {
    this.$store.commit("menu/setTitle", "En vivo");
    this.$store.commit("menu/setColor", this.principalColor);
    this.$store.commit("menu/setCatalogState", false);
  },
  methods: {
    async getEventById(eventId) {
      try {
        const { data } = await this.$api.event.getById(eventId);
        if (data.status.code === "0000") {
          this.event = data.result.event;
          console.log("==================: ");
          console.log("EVENTO: ", this.event);
          console.log("==================: ");
        }
      } catch (err) {
        console.log("Error: getEventById: ", err);
      }
      this.isPageLoading = false;
    },
    async onMessageSend(message) {
      try {
        if (this.chat === null) {
          const chatData = {
            eventId: this.eventId,
          };
          console.log("No había chat", chatData);
          const { data } = await this.$api.chat.create(chatData);
          console.log("--->", data);
          if (data.status.code === "1013") return;
          await this.getChatByEventId();
          this.initChatController();
        }
        const chatId = this.chat._id;
        const chatData = {
          comment: message,
        };
        const { data } = await this.$api.chat.addComment(chatId, chatData);
        console.log("...............");
        console.log(data);
        console.log("...............");
        if (data.status.code === "0000") {
          this.getChatByEventId();
          return true;
        }
        return false;
      } catch (err) {
        console.log("sendMessage: ERROR ", err);
        return false;
      }
    },

    async getChatByEventId() {
      try {
        const { data } = await this.$api.chat.getByEvent(this.eventId);
        console.log("SE PIDIÓ UN CHAT,", data);
        if (data.status.code === "0000") {
          this.chat = data.result.chat;
        }
      } catch (err) {
        console.log("getChatByEventId: ", err);
      }
    },

    clearErroFields() {},
    initChatController() {
      if (!this.chatUpdateController && this.chat) {
        this.chatUpdateController = setInterval(() => {
          this.getChatByEventId();
        }, 10000);
      }
    },
  },
  destroyed() {
    clearInterval(this.chatUpdateController);
  },
};
</script>

<style scoped>
.chat {
  overflow-y: scroll;
}

.chat::-webkit-scrollbar {
  display: none;
}

.discover-event-height-fit {
  height: fit-content;
}
</style>
