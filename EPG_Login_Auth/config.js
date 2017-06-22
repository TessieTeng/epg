/*
 * 在 ConfigObj 添加某省的配置信息
 * 把 province 的值改成所需的省份的名称（名称需要跟ConfigObj里定义的相同）
 * 
 */

(function(window) {
    // 当前省份
    var province = 'hubei';

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

    /*
        EPGVersion 代表EPG的当前版本号

        使用时需要注意点：

        1. 该版本号与 git 版本库中的打的tag要保持一致，在提交升级版本时，
        需要使用命令更新仓库的版本标签，并且在这里把配置统一修改

        2. git tag 也要单独使用 `$ git push origin v1.5` 命令单独提交上库

        3. 请务必使用带附注标签，并注明版本修改内容或新增功能
            如：$ git tag -a v1.4 -m 'my version 1.4'

        使用前请务必阅读tag命令使用方式（若熟悉请无视）：https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
     */
    var SYEpgVersion = {
        no: 'v1.0.2',
        desc: '这里是版本描述',

        // 这里可以根据需要添加更多内容
        // 比如：
        // 1 修复的buglist
        // buglist: [ '解决焦点黄框问题', '解决视频卡顿问题', '等等'],
        // 2 新增功能列表
        // features: ['直播', '开机广告', '等等'],
        // 3 ......等等更多扩展内容
    };

    window.Config = ConfigObj[province];
    window.Config.SYEpgVersion = SYEpgVersion;
})(window)
