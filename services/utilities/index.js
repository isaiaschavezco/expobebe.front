const resource = 'utilities'

export default http => ({
  uploadFile (dataToUpload) {
    return http.post(`${resource}/uploadFile`, dataToUpload)
  },
  getAllBanners () {
    return http.get(`${resource}/getAllBanners`)
  },
  playGame (gameData) {
    return http.post(`${resource}/playGame`, gameData)
  },
  viewSection (sectionData) {
    return http.post(`${resource}/viewSection`, sectionData)
  },
  viewCatalog (catalogData) {
    return http.post(`${resource}/viewCatalog`, catalogData)
  },
  topGamesScore () {
    return http.get(`${resource}/top10Games`)
  }
})
