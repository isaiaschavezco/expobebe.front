const resource = 'users'

export default http => ({
  login (userData) {
    return http.post(`${resource}/login`, userData)
  },
  register (userData) {
    return http.post(`${resource}/register`, userData)
  },
  recovery (userData) {
    return http.post(`${resource}/recovery`, userData)
  },
  verification (userData) {
    return http.post(`${resource}/validate`, userData)
  },
  resendCode (userData) {
    return http.post(`${resource}/sendEmail4Code`, userData)
  },
  userScore (userData) {
    return http.post(`${resource}/score`, userData)
  }
})
