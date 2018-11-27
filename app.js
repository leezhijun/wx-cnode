//app.js
const Towxml = require('/towxml/main');  
App({
  onLaunch: function () {
   
  },
  globalData: {
    username: 'leezhijun',
    accesstoken: '3e37c62b-4ac9-4440-a5de-9dc385750b12'
  },
  towxml: new Towxml()
})