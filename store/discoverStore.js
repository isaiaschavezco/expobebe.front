export const state = () => ({
    tradeMarks: null,
    banners:null,
    currentTradeMarkId:null,
    currentTradeMarkProducts:null,
    currentTrademarkName:null,
    currentTrademarkColor:null,


})
export const mutations = {
    setTradeMarks(state, tradeMarks) {
        state.tradeMarks = tradeMarks
    },
    setBanners(state, banners) {
        state.banners = banners
    },
    setCurrentTradeMarkId(state,id){
        state.currentTradeMarkId = id
    },
    setCurrentTradeMarkProducts(state,products){
        state.currentTradeMarkProducts = products
    },
    setCurrentTrademarkName(state, name) {
        state.currentTrademarkName = name
    },
    setCurrentTrademarkColor(state,color) {
        state.currentTrademarkColor = color
    },
  
}