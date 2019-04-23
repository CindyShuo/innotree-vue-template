import * as filters from './filters'
import Utils from './utils'
import BaseApi from './api/baseApi'

export default {
  install: function (Vue, options) {
    window.Vue = Vue
    /* 全局filters */
    Object.keys(filters).forEach(filterName => {
      Vue.filter(filterName, filters[filterName])
    })
    Vue.prototype.$filter = filters
    Vue.prototype.$utils = Utils
    Vue.prototype.$baseApi = BaseApi
  }
}
