const resource = 'chats'

export default http => ({
  create (chatData) {
    return http.post(`${resource}`, chatData)
  },
  getByEvent (eventId) {
    return http.get(`${resource}/${eventId}`)
  },
  addComment (chatId, chatData) {
    return http.post(`${resource}/${chatId}/comment`, chatData)
  }
})
