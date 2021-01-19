export const state = () => ({
    title: '',
    color: '',
    isCatalogVisible: true,
    isButtonShopingCarVisible: true
})
export const mutations = {
    setTitle(state, title) {
        state.title = title
    },
    setColor(state, color) {
        state.color = color
    },
    setCatalogState(state, isView) {
        state.isCatalogVisible = isView
    },
    setButtonShopingCarVisible(state, isVisible) {
        state.isButtonShopingCarVisible = isVisible
    }
}