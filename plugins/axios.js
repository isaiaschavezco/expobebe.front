import Repository from '~/services/RepositoryFactory'


// const protocol  = "https://"
const protocol  = "https://"
const   host                 = "expobebe.asia"
const   port                 = ""

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    // baseURL: 'https://dev.losmagicians.mx/api/'
    baseURL:  `${protocol}${host}${port}/api/` 
  })

  // Inject to context as $api
  inject('api', Repository(api))
}
