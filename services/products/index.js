const resourceUnder = 'under/products'
const resourcePregned = 'pregnant/products'
const resourceNewBorn ='newlyborn/products'
import { NEWBORN, PREGNED, UNDER } from '../../types'


export default http => ({
  getAllTradeMarks (type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/getAllTrademarks`)
  },
  getByTrademark (idTradeMark,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/pagination/1?limit=10000&trademarks=${idTradeMark}`)
  },
  getById (idProduct,type) {
    const resource = type === NEWBORN ?  resourceNewBorn : type === PREGNED ?  resourcePregned :  resourceUnder
    return http.get(`${resource}/${idProduct}`)
  }
})
