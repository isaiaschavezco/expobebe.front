import Repository from '~/services/RepositoryFactory'


const protocol  = "http://"
const   host                 = "localhost:"
const   port                 = "3456"

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    // baseURL: 'https://dev.losmagicians.mx/api/'
    baseURL:  `${protocol}${host}${port}/api/` 
  })

  // Inject to context as $api
  inject('api', Repository(api))
}
