module.exports = {
  rem: `<script type="text/javascript">
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function () {
                FastClick.attach(document.body);
            }, false);
        };
        window.onload = function(){
          getRem(375,100);
        };
        window.onresize = function(){
          getRem(375,100);
        };
        function getRem(pwidth,prem){
          var html = document.getElementsByTagName("html")[0];
          var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
          html.style.fontSize = oWidth/pwidth*prem + "px";
        };
        </script>`
}