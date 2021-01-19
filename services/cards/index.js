const resourceUnder = 'under/cards'
const resourcePregned = 'pregnant/cards'
const resourceNewBorn = 'newlyborn/cards'
import { NEWBORN ,PREGNED,UNDER} from '../../types'


export default http => ({
    create(cardData,type) {
        const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder

        return http.post(`${resource}/createCard`, cardData)
    },
    update(cardId, cardData) {
        return http.patch(`${resource}/${cardId}`, cardData)
    },
    getByUserAndStatus(userId, status) {
        return http.get(`${resource}/getAllCardsByUserId?userId=${userId}&status=${status}`)
    },
    getSantaVideo(name) {
        return http.get(`${resource}/getVideo?name=${name}`)
    }
})