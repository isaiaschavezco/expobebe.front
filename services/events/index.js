

const resourceUnder = 'under/events'
const resourcePregned = 'pregnant/events'
const resourceNewBorn ='newlyborn/events'
import { NEWBORN, PREGNED, UNDER } from '../../types'


export default http => ({
  
  getByDatesRange (lowerDate, greaterDate,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/pagination/1?limit=10000&status=CREATED&greaterDate=${greaterDate}&lowerDate=${lowerDate}`)
  },
  getAll (type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/pagination/1?limit=10000&status=CREATED`)
  },
  getById (eventId,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/${eventId}`)
  },
  getEvent360Meny (eventDate,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/pagination/1?status=CREATED&greaterDate=${eventDate}&lowerDate=2021-12-12&limit=1000`)
  }
})
