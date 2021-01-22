export const state = () => ({
  title: '',
  color: '',
  isCatalogVisible: true,
  isButtonShopingCarVisible: true,
  currentSection: null,
  loading: false
})
export const mutations = {
  setTitle (state, title) {
    state.title = title
  },
  setLoading (state, status) {
    state.loading = status
  },
  setCurrentSection (state, section) {
    state.currentSection = section
  },
  setColor (state, color) {
    state.color = color
  },
  setCatalogState (state, isView) {
    state.isCatalogVisible = isView
  },
  setButtonShopingCarVisible (state, isVisible) {
    state.isButtonShopingCarVisible = isVisible
  },
  validateTypeScreen (state) {
    // if (localStorage) {
    //   const cat = localStorage.getItem('currentSection');
    //   state.currentSection = cat
      
    // }

      if( !state.currentSection || state.currentSection === '' )
      {
          this.$router.push({
              name: 'index'
            })
        }
  }
}
