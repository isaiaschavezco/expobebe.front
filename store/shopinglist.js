export const state = () => ({
  isShopingCarListVisible: false,
  isShopingCarListOk: false,
  isSantaVideoModalShown: false,
  isAddedCartModalShown: false,
  existInCar: false,
  wishlist: {
    email: 'isaiaschavez.co@gmail.com',
    gender: 'female',
    listItems: [
     
    ]
  }
})

export const mutations = {
  toggleShopingCarListVisible (state) {
    state.isShopingCarListVisible = !state.isShopingCarListVisible
  },
  async deleteItem (state, key) {
      const newListItems = []
      state.wishlist.listItems = state.wishlist.listItems.filter(item => {
        if (item._id !== key) {
          newListItems.push(item._id)
          return item
        }
      })
  },
  addItem (state, item) {
    state.wishlist.listItems.push( item )  
    state.existInCar = true
    state.isAddedCartModalShown = true
    console.log("state",state);
  },
  async getWishList ( state ) {
    
    return state.wishlist.listItems
  },
  async sendLetter (state,type) {
      try
      {
      let data = {...state.wishlist}
      const newListItems = []
      state.wishlist.listItems.forEach(item => {
        newListItems.push(item._id)
      })
      data.listItems = newListItems
      const response = await this.$api.card.create(data,type)
      console.log( response );
      this.existProduct = false
      this.existProduct = false
      state.wishlist.listItems = []
        
    } catch (error) {
      console.log('Ocurrio un error', error)
    }
  },

  async existProduct (state, id) {
   let exist = state.wishlist.listItems.find(item => item._id === id)
   if(exist){
     state.existInCar = true
    } else
    {
     state.existInCar = false
   }
  },
  
  setIsVideoModalShown (state, status) {
    state.isSantaVideoModalShown = status
  },
  setIsAddedCartModalShown (state, status) {
    state.isAddedCartModalShown = status
  }
}
