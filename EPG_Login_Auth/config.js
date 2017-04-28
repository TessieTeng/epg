/*
 * 在 ConfigObj 添加某省的配置信息
 * 把 province 的值改成所需的省份的名称（名称需要跟ConfigObj里定义的相同）
 * 
 */

(function(window) {
  // 当前省份
  var province = '湖北';
  
  // 所有省份
  var ConfigObj = {

    '云南': {
      province: '云南',
      relativePath: '/iptv/ppthdplay/SYHOTEL/service',
    },
    '湖北': {
      province: '湖北',
      relativePath: '',
    },

  }
  window.Config = ConfigObj[province];
})(window)