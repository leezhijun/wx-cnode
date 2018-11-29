//app.js
const Towxml = require('/towxml/main');  
App({
  onLaunch: function () {
   
  },
  globalData: {
    username: null,
    accesstoken: null
  },
  towxml: new Towxml()
})