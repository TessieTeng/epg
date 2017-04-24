/*
 * 在 ConfigObj 添加某省的配置信息
 * 把 province 的值改成所需的省份的名称（名称需要跟ConfigObj里定义的相同）
 * 
 */

(function(window) {
  var province = '云南';
  
  var ConfigObj = {

    '云南': {
      name: '云南',
      relativePath: '/iptv/ppthdplay/SYHOTEL/',
    },
    '湖北': {
      name: '湖北',
      relativePath: '/iptv/',
    },

  }
  window.Config = ConfigObj[province];
})(window)