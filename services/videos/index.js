const resource = 'videos'

export default http => ({
  getByName (name) {
    return http.get(`${resource}/getAllByFilter/1?limit=10&name=${name}`)
  }
})
