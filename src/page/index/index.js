import $ from 'jquery'
import './index.css'
$.get('/test', function (data) {
  console.log(data)
})
