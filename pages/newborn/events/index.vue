<template>
  <div class="w-full h-full min-h-full relative">
    <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
      <div class="preloader"></div>
    </div>

    <!-- Carrete de Calendario -->
    <Carrete
      :functionNext="onNextMonthClicked"
      :functionBefore="onPreviousMonthClicked"
      :months="months"
      :selectedMonth="selectedMonth"
    />
    <h2
      class="w-full font-bold text-center mt-32 text-graycorp lg:text-2xl"
      v-if="eventsToRender.length === 0"
    >
      Parece que no hay eventos en este mes.
    </h2>
    <!-- Eventos -->
    <div class="w-full h-full md:w-8/12 mx-auto mt-12 flex flex-col">
      <div class="event-rows-container pb-32">
        <div
          v-for="eventByDate in eventsToRender"
          class="flex flex-col mt-10 events-border-top"
        >
          <div
            :id="eventByDate[0]"
            :key="eventByDate[0]"
            class="flex flex-col md:flex-row mb-5"
          >
            <div
              :id="eventByDate[0]"
              :key="eventByDate[0]"
              class="flex mb-5 max-bg-black"
            >
              <div class="flex flex-col items-center">
                <div
                  class="text-white text-lg lg:text-xl xl:text-xl bg-yellowcorp rounded py-2 px-8 font-bold shadow-xl eventdate-style"
                >
                  {{ eventByDate[0] }}
                </div>
              </div>
            </div>
            <div
              class="w-full flex flex-col md:flex-row md:flex-wrap justify-center items-center"
            >
              <CardEvent
                v-for="event in eventByDate[1]"
                :functionClick="onEventClicked"
                :dataFunction="event._id"
                :key="event._id"
                :urlImage="event.urlThumbnail"
                alt="Imagen de evento"
                :title="event.name"
                :subtitle="event.hour"
                :colorCard="principalColor"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="event-footer w-full bg-transparent py-3" @click="onNextMonthClicked">
        <button
          :class="principalColor"
          class="flex justify-center mx-auto my-auto w-10/12 md:w-4/12 py-2 text-white font-bold shadow-xl"
        >
          <p>
            Ir a
            {{
              this.nextDateToQuery.toLocaleString("es-MX", {
                month: "long",
                timeZone: "America/Mexico_City",
                hour12: true,
              })
            }}
          </p>
          <img
            class="h-4 w-4 ml-4"
            src="~assets/img/proximo-white.svg"
            alt=""
            srcset=""
          />
        </button>
      </div>
      <!--  -->
      <!--  -->
    </div>
  </div>
</template>

<script>
import CardEvent from "@/components/discover/Events/Card";
import Carrete from "@/components/discover/Events/Carrete";
import { NEWBORN, UNDER, PREGNED } from "@/types/";

export default {
  layout: "circleheader",
  components: {
    CardEvent,
    Carrete,
  },
  data() {
    return {
      events: {},
      actualDate: null,
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      selectedMonth: 0,
      eventsToRender: [],
      prevDateToQuery: null,
      nextDateToQuery: null,
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
  created() {
    this.$store.commit("menu/validateTypeScreen");

    this.typeScreen = this.$store.state.menu.currentSection;
    this.initDates();
    this.selectedMonth = this.actualDate.getMonth();
    this.getEventsByDateRange();
  },
  mounted() {
    this.$store.commit("menu/setTitle", "Eventos");
    this.$store.commit("menu/setColor", this.principalColor);
    this.$store.commit("menu/setButtonShopingCarVisible", false);
    console.log("asdfasdf", this.principalColor, this.typeScreen);
  },
  methods: {
    scrollToDiv(array, todayDate) {
      if (todayDate && array !== "null") {
        console.log(array);
        console.log(todayDate);
        const val = todayDate;
        const dir = false;
        let nearestDate = 0;
        for (let i = 0; i < array.length; i++) {
          if (dir === true) {
            if (array[i] > val) {
              nearestDate = array[i - 1] || 0;
              console.log(array[i - 1] || 0);
            }
          } else if (array[i] >= val) {
            nearestDate = array[i];
            console.log(array[i]);
          }
        }
        if (nearestDate) {
          nearestDate = nearestDate.toString();
          console.log(nearestDate);
          const element = document.getElementById(nearestDate);
          console.log(element);
          element.scrollIntoView();
        }
      }
    },
    onNextMonthClicked() {
      this.nextDateToQuery = new Date(
        this.nextDateToQuery.setMonth(this.nextDateToQuery.getMonth() + 1)
      );
      this.prevDateToQuery = new Date(
        this.prevDateToQuery.setMonth(this.prevDateToQuery.getMonth() + 1)
      );
      if (this.selectedMonth === 11) {
        this.selectedMonth = 0;
      } else {
        this.selectedMonth++;
      }
      this.getEventsByDateRange();
    },
    onPreviousMonthClicked() {
      this.nextDateToQuery = new Date(
        this.nextDateToQuery.setMonth(this.nextDateToQuery.getMonth() - 1)
      );
      this.prevDateToQuery = new Date(
        this.prevDateToQuery.setMonth(this.prevDateToQuery.getMonth() - 1)
      );
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11;
      } else {
        this.selectedMonth--;
      }
      this.getEventsByDateRange();
    },
    async getEventsByDateRange() {
      this.events = {};
      this.eventsToRender = [];
      console.log(
        "DATE TO QUERY: ",
        this.formatDate(this.prevDateToQuery),
        this.formatDate(this.nextDateToQuery)
      );
      const { data } = await this.$api.event.getByDatesRange(
        `${this.formatDate(this.nextDateToQuery)}`,
        `${this.formatDate(this.prevDateToQuery)}`,
        this.typeScreen
      );
      console.log("response: ", data);
      if (data.status.code === "0000") {
        data.result.events.forEach((event) => {
          // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City', hour12: true }
          const optionsMonth = {
            month: "long",
            timeZone: "America/Mexico_City",
            hour12: true,
          };
          const optionsHour = {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Mexico_City",
            hour12: true,
          };
          const optionsDate = {
            day: "2-digit",
            timeZone: "America/Mexico_City",
            hour12: true,
          };
          const date = new Date(event.date);
          if (
            !Object.prototype.hasOwnProperty.call(
              this.events,
              date.toLocaleString("es-MX", optionsDate)
            )
          ) {
            this.events[date.toLocaleString("es-MX", optionsDate)] = [];
          }

          this.events[date.toLocaleString("es-MX", optionsDate)].push({
            _id: event._id,
            name: event.name,
            date: date.toLocaleString("es-MX", optionsDate),
            month: date.toLocaleString("es-MX", optionsMonth),
            hour: date.toLocaleString("es-MX", optionsHour),
            urlThumbnail: event.urlThumbnail,
            color: event.color,
            status: event.status,
          });
        });
        console.log("events: ", this.events);
        console.log("KEYS: ", Object.keys(this.events));
        this.eventsToRender = Object.entries(this.events);
        console.log("eventsToRender: ", this.eventsToRender);
        this.isPageLoading = false;
      }
    },
    onEventClicked(eventId) {
      this.$router.push({
        name: "newborn-events-id",
        params: {
          id: eventId,
          typeScreen: this.typeScreen,
        },
      });
    },
    formatDate(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }
      return [year, month, day].join("-");
    },
    initDates() {
      this.actualDate = new Date();
      this.prevDateToQuery = new Date();
      this.nextDateToQuery = new Date(this.prevDateToQuery.setDate(1));
      this.nextDateToQuery = new Date();
      this.nextDateToQuery = new Date(
        this.nextDateToQuery.setMonth(this.nextDateToQuery.getMonth() + 1)
      );
      this.nextDateToQuery = new Date(this.nextDateToQuery.setDate(1));
    },
    onScrollHandler(event) {
      const container = this.$refs.events_event_container;
    },
  },
};
</script>

<style scoped>
.events-container {
  min-height: 100%;
}
.events-live-tag {
  top: 0.5rem;
  left: 0.5rem;
}

@media (min-width: 1024px) {
  .events-border-top {
    border-top: 4px solid rgb(147, 203, 228);
    padding-top: 30px;
    color: #3cb4e5;
  }
}

.eventdate-style {
  border-bottom-right-radius: 100pt;
  border-top-left-radius: 100pt;
}

.event-rows-container {
  height: 100%;
  min-height: 100%;
  overflow: scroll;
}
.event-footer {
  position: fixed;
  bottom: 0;
  left: 0;

  min-height: 10%;
}
</style>
