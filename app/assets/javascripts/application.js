// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require moment
//= require moment/ko.js
//= require socket.io
//= require cable.js

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments)};
gtag('js', new Date());

gtag('config', 'UA-102519635-1');
//GoogleAnalytics
// Facebook Pixel Code
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '278615309297574');
fbq('track', 'PageView');

$(document).ready(function () {
  //GoogleAnalytics user_id
  if (document.getElementById("ga_user_id")) {
    var ga_user_id = document.getElementById("ga_user_id").value;
    gtag('set', {'user_id': ga_user_id}); // 로그인한 User-ID를 사용하여 User-ID를 설정합니다.
  };

  //Channel Plugin Scripts
  if (ga_user_id) {
    var user_nickname = document.getElementById("user_nickname").value;
    window.channelPluginSettings = {
      "plugin_id": "4dbb7278-ace9-48ca-8e77-387658fde8c7",
      "user": {
        "id": ga_user_id,
        "name": user_nickname
      }
    };
  } else {
    window.channelPluginSettings = {
      "plugin_id": "4dbb7278-ace9-48ca-8e77-387658fde8c7"
    };
  };
  (function() {
    var node = document.createElement('div');
    node.id = 'ch-plugin';
    document.body.appendChild(node);
    var async_load = function() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    };
    if (window.attachEvent) {
      window.attachEvent('onload', async_load);
    } else {
      window.addEventListener('load', async_load, false);
    }
  })();
  // End Channel Plugin
});
