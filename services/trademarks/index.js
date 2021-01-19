const resourceUnder = 'under/trademarks'
const resourcePregned = 'pregnant/trademarks'
const resourceNewBorn ='newlyborn/trademarks'

import { NEWBORN, PREGNED, UNDER } from '../../types'

export default http => ({
  getById ( id, type ) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder

    return http.get(`${resource}/${id}`)
  }
})
