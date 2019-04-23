const envUrl = {
  production: {
    baseURL: ''
  },
  test: {
    baseURL: ''
  },
  development: {
    baseURL: ''
  }
}

const Url = {
  baseURL: envUrl[process.env.NODE_ENV].baseURL
}

export default Url
