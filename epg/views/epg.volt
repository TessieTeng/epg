{% extends "../../../base_views/tpl_mobile_vue_blank.volt" %}

{% block title %}{{ row["Title"]|default('终极排行榜') }}{% endblock %}

{% block head %}
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
{% endblock %}

{% block container %}
<div> {{QRCode}}</div>
{% endblock %}

{% block foot %}
   <script type="text/javascript">
      var script = document.createElement('script');
        if(/utudev/.test(window.navigator.userAgent)){
            script.src = 'http://localhost:8086/index.js?v=' + Math.random();
        }else{
            script.src = '/app/modules/dualscreen/script/itvs/final_rank/dist/index.js?v=2016090101'+ new Date().getTime() ;// + new Date().getTime();
            // script.src = '/app/modules/dualscreen/script/itvs/dist/index.js?v=2016082705' + new Date().getTime();
            // script.src = 'http://192.168.100.230:1234/app/modules/dualscreen/script/itvs/dist/index.js?v=20160810' + Math.random();
            // script.src = 'http://hedgehog.ngrok.cc/app/modules/dualscreen/script/itvs/dist/index.js?v=20160810' + Math.random();
        }
        document.querySelectorAll('body')[0].appendChild(script);
    </script>
{% endblock %}
