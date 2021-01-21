const resourceUnder = 'under/chats'
const resourcePregned = 'pregnant/chats'
const resourceNewBorn ='newlyborn/chats'
import { NEWBORN, PREGNED, UNDER } from '../../types'

export default http => ({
  create ( chatData, type ) {
    console.log("El tipo que se está creando es:",type);
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.post(`${resource}`, chatData)
  },
  addComment (chatId, chatData,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.post(`${resource}/${chatId}/comment`, chatData)
  },
  getByEvent (eventId,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/${eventId}`)
  },
})
