import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (date, dateFormat) => {
  if (!date) {
    date = new Date()
  }
  return moment(date).format(dateFormat)
})
