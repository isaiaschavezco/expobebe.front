export const state = () => ({
  isShopingCarListVisible: false,
  isShopingCarListOk: false,
  isSantaVideoModalShown: false,
  isAddedCartModalShown: false,
  wishlist: {
    email: 'isaiaschavez.co@gmail.com',
    gender: 'female',
    listItems: [
      {
        _id: '6004764cbd346829284da1c3',
        images: [
          'https://sfo2.digitaloceanspaces.com/juguetilandia.media/event/images/trademarks/J218%20%281%20of%2035%29.jpg',
          'https://sfo2.digitaloceanspaces.com/juguetilandia.media/event/images/trademarks/J218%20%281%20of%2035%29.jpg'
        ],
        name: 'Isaias'
      },
      {
        _id: '6004764cbd346829284da1c3',
        images: [
          'https://sfo2.digitaloceanspaces.com/juguetilandia.media/event/images/trademarks/J218%20%281%20of%2035%29.jpg',
          'https://sfo2.digitaloceanspaces.com/juguetilandia.media/event/images/trademarks/J218%20%281%20of%2035%29.jpg'
        ],
        name: 'Isaias'
      }
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
  async addItem (state, item) {
      state.wishlist.listItems.push( item )  
      state.isAddedCartModalShown = true
  },
  async getWishList (state) {
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
      console.log(newListItems)
      data.listItems = newListItems
      const response = await this.$api.card.create(data,type)
      alert("Correcto")
    } catch (error) {
      console.log('Ocurrio un error', error)
    }
  },

  async existProduct (state, id) {},
  
  setIsVideoModalShown (state, status) {
    state.isSantaVideoModalShown = status
  },
  setIsAddedCartModalShown (state, status) {
    state.isAddedCartModalShown = status
  }
}
