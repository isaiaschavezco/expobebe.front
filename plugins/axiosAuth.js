import Repository from '~/services/RepositoryFactory'

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const apiAuth = $axios.create({
    headers: {
      Authorization: {
        toString () {
          return `Bearer ${localStorage.getItem('token')}`
        }
      }
    },
    baseURL: 'https://dev.losmagicians.mx/api/'
  })

  // Inject to context as $api
  inject('apiAuth', Repository(apiAuth))
}
