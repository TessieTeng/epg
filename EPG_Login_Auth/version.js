
(function (window) {
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
    var EpgVersion = {
        no: 'H5EPG30_1.1.0_170630',
        desc: '发布SIT测试版本',
        buglist: [
            '修复广视两款盒子欢迎页和主页不能播放视频问题',
        ],
        features: [
            '新增现网盒子通过配置后台path跳转到完整的测试EPG进行测试功能', 
        ],
    };

    window.EpgVersion = EpgVersion;
})(window);
