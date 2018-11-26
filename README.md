### 小程序“踩坑”之旅

cnode社区个人版，用于学习小程序，感谢cnode社区提供的API，好了下面开始踩坑之旅

#### 基础

1. 基础目录结构，可以简单分为pages目录，app.js、app.json、app.wxss、project.config.json

   pages目录：页面模块目录，一般按首页，列表页，文章页划分

   app.js：个人理解为，小程序一开始执行js行为

   app.json: 小程序全局配置

   app.wxss: 公共样式

   project.config.json: 项目配置文件,基本不改动

2. pages目录，一个页面模块一个子目录，子目录文件app.wxml、app.js、app.json（基本不用）、app.wxss，简单理解就是 页面模板，页面行为，页面配置，页面样式

3. 生命周期，简单理解就是页面定时触发的事件行为

4. WXS，小程序的脚本语言，和js基本差不多，定义变量不能用let和const否则会报错，一般用来单独写js功能模块，用来处理数据渲染

   例子：tab显示

   ```
   var tabarr = {
     all: '全部',
     good: '精华',
     share: '分享',
     ask: '问答',
     job: '招聘'
   }
   
   function tabFilter(tab) {
     return tabarr[tab]
   }
   
   module.exports = {
     tabFilter: tabFilter
   }
   ```

   ```wxml
   <wxs module="tabFilter" src="../filter/tabFilter.wxs"></wxs>
   <text class='tab'>{{tabFilter.tabFilter(tab)}}</text>
   ```

5. template 模板，wxml文件的复用公共文件，公共部分提出来，或分块代码，减轻代码结构

   用法：

   ```wxml
   <template name="topicList">
   ...
   </template>
   ```

   ```wxml
   <import src="../../template/topicList.wxml"/>
   <template is="topicList" data="{{...item}}"/>
   ```

   #### 踩坑

   1. wxs中，正则报错直接写str.replace(/--/,'')会报错

      解决：

      ```
      var reg = getRegExp("<[^>]+>|&[^>]+;", "g");
      var newStr = str.replace(reg, "");//去掉所有的html标记
      ```

   2. wx.request 按理说404应该算是请求失败，应该执行fail回调函数才对，但是实际上还是执行的success回调函数

      解决：利用状态码进行错误判断

   3. onReachBottom 打死不触发，很奇怪明明app.json已经开起了"onReachBottomDistance": 50,但是上拉刷新却不执行

      解决：应该是weiUI的框架问题，将高度page,.page,.page__bd{/* height: 100%; */}就可以了