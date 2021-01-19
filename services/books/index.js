const resourceUnder = 'under/books'
const resourcePregned = 'pregnant/books'
const resourceNewBorn ='newlyborn/books'

import { NEWBORN ,PREGNED,UNDER} from '../../types'

export default http => ({
  getAll ( type ) {

    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    console.log(PREGNED,type);
    return http.get(`${resource}/pagination/:skip`)
  },
  getById (bookId,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/${bookId}`)
  },
})
