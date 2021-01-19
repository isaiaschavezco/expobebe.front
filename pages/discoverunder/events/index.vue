<template>
<div class="w-full xl:px-64 m-auto pt-5 h-full overflow-y-scroll">
  <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
    <img class="animate-spin w-12 h-12" :src="require('@/assets/img/all/loading.png')" alt="" data-not-lazy>
  </div>
  <div v-if="!isPageLoading" class="flex flex-col items-center w-full">
    <!-- Carrete de Calendario -->
    <div class="fixed flex justify-center z-20">
      <button class="bg-blue-400 bg-opacity-25 z-50 rounded-full h-10 w-10  flex justify-center items-center mr-3" @click="onPreviousMonthClicked">
        <img class="h-5 w-5" src="~assets/img/flecha-izquierda.svg" alt="" srcset="">
      </button>
      <div class="text-white text-2xl bg-blue-400 rounded px-10 py-1 font-bold shadow-xl capitalize">
        {{ months[selectedMonth] }}
      </div>
      <button class="bg-blue-400 bg-opacity-25 rounded-full h-10 w-10  flex justify-center items-center ml-3" @click="onNextMonthClicked">
        <img class="h-5 w-5 transform rotate-180" src="~assets/img/flecha-izquierda.svg" alt="" srcset="">
      </button>
    </div>
    <!--  -->
    <!-- Eventos -->
    <div id="events-event-container" ref="events_event_container" class="h-full w-full  pt-16 pb-48 lg:w-full px-5 lg:px-48   flex justify-center flex-col ">
      <template v-for="eventByDate in eventsToRender">
        <div class="flex mt-10 border-solid events-border-top">
          <div :id="eventByDate[0]" :key="eventByDate[0]" class="flex w-1/12">
            <div class="flex flex-col items-center ">
              <div class="flex-grow-0 text-white text-2xl bg-blue-400 rounded py-2 px-3 font-bold shadow-xl">
                {{ eventByDate[0]  }}
              </div>
            </div>
          </div>
          <div class="w-full ml-3">
            <template v-for="event in eventByDate[1]">
              <div :key="event._id" class="max-w-sm rounded relative overflow-hidden shadow-xl mb-5 lg:inline-block lg:m-12 w-9/12 mx-auto lg:w-5/12" @click="onEventClicked(event._id)">
                <div v-if="event.status === 'En vivo'" class="bg-redjugueti text-white font-bold absolute px-3 rounded-full events-live-tag ">
                  En vivo
                </div>
                <img class="w-full" :src="event.urlThumbnail" alt="Imagen de evento">
                <div class=" bg-red px-3 py-4 flex justify-between" :style="{backgroundColor: event.color}">
                  <div class="font-bold text-xs xl:text-lg text-white capitalize">
                    {{ event.name }}
                  </div>
                  <div class="text-xs xl:text-xl ml-2 text-white uppercase">
                    {{ event.hour }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

      </template>

    </div>
    <div v-if="eventsToRender.length >= 1" class="flex cursor-pointer items-center justify-center  w-8/12 lg:w-6/12 mx-auto text-white text-lg bg-blue-400 rounded py-2 -my-20 mb-32 font-bold shadow-xl" @click="onNextMonthClicked">
      Ir a {{ this.nextDateToQuery.toLocaleString('es-MX', { month: 'long', timeZone: 'America/Mexico_City', hour12: true }) }} <img class="h-4 w-4 ml-4" src="~assets/img/proximo-white.svg" alt="" srcset="">
    </div>
    <!--  -->
  </div>
  <!--  -->
</div>
</div>
</template>

<script>
export default {
  layout: 'circleheader',
  data() {
    return {
      events: {},
      actualDate: null,
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      selectedMonth: 0,
      eventsToRender: [],
      prevDateToQuery: null,
      nextDateToQuery: null,
      isPageLoading: true
    }
  },
  created() {
    this.initDates()
    console.log('DATES INIT: ', this.formatDate(this.prevDateToQuery), this.formatDate(this.nextDateToQuery))
    this.selectedMonth = this.actualDate.getMonth()
    this.getEventsByDateRange()
  },
  mounted() {
    this.$store.commit('menu/setTitle', 'Eventos')
    this.$store.commit('menu/setColor', '#FFB71B')
    this.$store.commit('menu/setButtonShopingCarVisible', false)

    console.log('hola mounted')
    // this.scrollToDiv()
  },
  methods: {
    scrollToDiv(array, todayDate) {
      if (todayDate && array !== 'null') {
        console.log(array)
        console.log(todayDate)
        const val = todayDate
        const dir = false
        let nearestDate = 0
        for (let i = 0; i < array.length; i++) {
          if (dir === true) {
            if (array[i] > val) {
              nearestDate = array[i - 1] || 0
              console.log(array[i - 1] || 0)
            }
          } else if (array[i] >= val) {
            nearestDate = array[i]
            console.log(array[i])
          }
        }
        if (nearestDate) {
          nearestDate = nearestDate.toString()
          console.log(nearestDate)
          const element = document.getElementById(nearestDate)
          console.log(element)
          element.scrollIntoView()
        }
      }
    },
    onNextMonthClicked() {
      this.nextDateToQuery = new Date(this.nextDateToQuery.setMonth(this.nextDateToQuery.getMonth() + 1))
      this.prevDateToQuery = new Date(this.prevDateToQuery.setMonth(this.prevDateToQuery.getMonth() + 1))
      if (this.selectedMonth === 11) {
        this.selectedMonth = 0
      } else {
        this.selectedMonth++
      }
      this.getEventsByDateRange()
    },
    onPreviousMonthClicked() {
      this.nextDateToQuery = new Date(this.nextDateToQuery.setMonth(this.nextDateToQuery.getMonth() - 1))
      this.prevDateToQuery = new Date(this.prevDateToQuery.setMonth(this.prevDateToQuery.getMonth() - 1))
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11
      } else {
        this.selectedMonth--
      }
      this.getEventsByDateRange()
    },
    async getEventsByDateRange() {
      this.events = {}
      this.eventsToRender = []
      console.log('DATE TO QUERY: ', this.formatDate(this.prevDateToQuery), this.formatDate(this.nextDateToQuery))
      const {
        data
      } = await this.$api.event.getByDatesRange(`${this.formatDate(this.nextDateToQuery)}`, `${this.formatDate(this.prevDateToQuery)}`)
      console.log('response: ', data)
      if (data.status.code === '0000') {
        data.result.events.forEach((event) => {
          // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City', hour12: true }
          const optionsMonth = {
            month: 'long',
            timeZone: 'America/Mexico_City',
            hour12: true
          }
          const optionsHour = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Mexico_City',
            hour12: true
          }
          const optionsDate = {
            day: '2-digit',
            timeZone: 'America/Mexico_City',
            hour12: true
          }
          const date = new Date(event.date)
          if (!Object.prototype.hasOwnProperty.call(this.events, date.toLocaleString('es-MX', optionsDate))) {
            this.events[date.toLocaleString('es-MX', optionsDate)] = []
          }

          this.events[date.toLocaleString('es-MX', optionsDate)].push({
            _id: event._id,
            name: event.name,
            date: date.toLocaleString('es-MX', optionsDate),
            month: date.toLocaleString('es-MX', optionsMonth),
            hour: date.toLocaleString('es-MX', optionsHour),
            urlThumbnail: event.urlThumbnail,
            color: event.color,
            status: event.status
          })
        })
        console.log('events: ', this.events)
        console.log('KEYS: ', Object.keys(this.events))
        this.eventsToRender = Object.entries(this.events)
        console.log('eventsToRender: ', this.eventsToRender)
        this.isPageLoading = false
        // const todayDate = new Date()
        // this.$nextTick(() => {
        //   // const container = this.$refs.events_event_container
        //   // container.scrollTop = container.scrollHeight
        //   console.log('DIV SCROLL: ', document.getElementById('events-event-container'))
        //   document.getElementById('events-event-container').addEventListener('scroll', this.onScrollHandler)
        // })
      }
    },
    onEventClicked(eventId) {
      this.$router.push({
        name: 'discover-events-id',
        params: {
          id: eventId
        }
      })
    },
    formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [year, month, day].join('-')
    },
    initDates() {
      this.actualDate = new Date()
      this.prevDateToQuery = new Date()
      this.nextDateToQuery = new Date(this.prevDateToQuery.setDate(1))
      this.nextDateToQuery = new Date()
      this.nextDateToQuery = new Date(this.nextDateToQuery.setMonth(this.nextDateToQuery.getMonth() + 1))
      this.nextDateToQuery = new Date(this.nextDateToQuery.setDate(1))
    },
    onScrollHandler(event) {
      console.log('SCROLLING: ', event)
      const container = this.$refs.events_event_container
      // container.scrollTop = container.scrollHeight
      console.log('SCROLLING VAR: ', container.scrollHeight, container.scrollTop)
    }
  }
}
</script>

<style scoped>
.events-live-tag {
  top: 0.5rem;
  left: 0.5rem;
}

@media (min-width: 1024px) {
  .events-border-top {
    border-top: 4px dotted !important;
    padding-top: 30px;
    color: #3CB4E5;
  }
}
</style>
