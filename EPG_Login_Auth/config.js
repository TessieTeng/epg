/*
 * 在 ConfigObj 添加某省的配置信息
 * 把 province 的值改成所需的省份的名称（名称需要跟ConfigObj里定义的相同）
 * 
 */

(function(window) {
    // 当前省份
    var province = 'yunnan';

    // 所有省份
    var ConfigObj = {
        'yunnan': {
            province: '云南',
            relativePath: '/iptv/ppthdplay/SYHOTEL/service',
        },
        'hubei': {
            province: '湖北',
            relativePath: '',
        },
        'shanxi': {
            province: '陕西',
            relativePath: '',
        },
        'henan': {
            province: '河南',
            relativePath: '',
        },

    };

    window.Config = ConfigObj[province];
})(window)
