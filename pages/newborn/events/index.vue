<template>
<div class="w-full xl:px-64 m-auto pt-5 h-full overflow-y-scroll">
  <div v-if="isPageLoading" class="flex flex-col items-center justify-center h-full">
    <img class="animate-spin w-12 h-12" :src="require('@/assets/img/all/loading.png')" alt="" data-not-lazy>
  </div>
  <div v-if="!isPageLoading" class="flex flex-col items-center w-full">
    <!-- Carrete de Calendario -->
    <div class="fixed flex justify-center items-center z-20">
      <div class="flex justify-center items-center mr-6 cursor-pointer triangulo" @click="onPreviousMonthClicked">
      </div>
      <div class="text-4xl text-graycorp rounded px-10 py-1 font-semibold  capitalize">
        {{ months[selectedMonth] }}
      </div>
      <div class="flex justify-center items-center ml-6 cursor-pointer triangulo-invertido" @click="onNextMonthClicked">
      </div>
    </div>
    <!--  -->
    <!-- Eventos -->
    <div id="events-event-container" ref="events_event_container" class="h-full w-full  pt-16 pb-32 lg:w-full px-5 lg:px-32   flex justify-center flex-col ">
      <div v-for="eventByDate in eventsToRender">
        <div class=" flex flex-col  md:flex-row mt-10  events-border-top">
          <div :id="eventByDate[0]" :key="eventByDate[0]" class="flex w-10/12 md:w-2/12 mb-5">
            <div class="flex flex-col items-center ">
              <div class=" text-white text-2xl bg-yellowcorp rounded py-2 px-8 font-bold shadow-xl eventdate-style">
                {{ eventByDate[0]  }}
              </div>
            </div>
          </div>
          <div v-for="event in eventByDate[1]" class="w-full flex flex-wrap items-center justify-items-center">
              <CardEvent  
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
          <h2 class="w-full font-bold text-center mt-10 text-gray-600 lg:text-2xl" v-if="eventsToRender.length === 0">Parece que no hay eventos en este mes. </h2>

    </div>
    <div 
      :class="principalColor"
    v-if="eventsToRender.length >= 1" class="flex cursor-pointer items-center justify-center  w-8/12 lg:w-6/12 mx-auto text-white text-lg  rounded py-2 -my-20 mb-32 font-bold shadow-xl" @click="onNextMonthClicked">
      Ir a {{ this.nextDateToQuery.toLocaleString('es-MX', { month: 'long', timeZone: 'America/Mexico_City', hour12: true }) }} <img class="h-4 w-4 ml-4" src="~assets/img/proximo-white.svg" alt="" srcset="">
    </div>
    <!--  -->
  </div>
  <!--  -->
</div>
</div>
</template>

<script>
import CardEvent from '@/components/discover/Events/Card'
import { NEWBORN, UNDER, PREGNED } from '@/types/'


export default {
  layout: 'circleheader',
  components: {
    CardEvent
  },
  data() {
    return {
      events: {},
      actualDate: null,
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      selectedMonth: 0,
      eventsToRender: [],
      prevDateToQuery: null,
      nextDateToQuery: null,
      isPageLoading: true,
    }
  },
  computed:{
    principalColor(){
      return this.$store.state.menu.currentSection ===  NEWBORN ? 'bg-bluenewborn':this.typeScreen ===  UNDER ? 'bg-under' :'bg-pregned'
    }
  },
  created() {
    this.typeScreen = this.$store.state.menu.currentSection;
    this.initDates()
    this.selectedMonth = this.actualDate.getMonth()
    this.getEventsByDateRange()
  },
  mounted() {
    this.$store.commit('menu/setTitle', 'Eventos')
    this.$store.commit("menu/setColor", this.principalColor);
    this.$store.commit('menu/setButtonShopingCarVisible', false)
    console.log("asdfasdf",this.principalColor,this.typeScreen)
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
      } = await this.$api.event.getByDatesRange(`${this.formatDate(this.nextDateToQuery)}`, `${this.formatDate(this.prevDateToQuery)}`,this.typeScreen)
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
        
      }
    },
    onEventClicked(eventId) {
      this.$router.push({
        name: 'newborn-events-id',
        params: {
          id: eventId,
          typeScreen: this.typeScreen,
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
      const container = this.$refs.events_event_container
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
    border-top: 4px solid  rgb(147, 203, 228);
    padding-top: 30px;
    color: #3CB4E5;
  }
}
.triangulo {
     width: 0; 
     height: 0; 
     border-right: 25px solid rgb(147, 203, 228);
     border-top: 15px solid transparent;
     border-bottom: 15px solid transparent; 
     border-radius:10px;
}
.triangulo-invertido {
     width: 0; 
     height: 0; 
     border-left: 25px solid rgb(147, 203, 228);
     border-top: 15px solid transparent;
     border-bottom: 15px solid transparent; 
     border-radius:10px;
}
.eventdate-style{
border-bottom-right-radius: 100pt;
border-top-left-radius: 100pt;
}
</style>
