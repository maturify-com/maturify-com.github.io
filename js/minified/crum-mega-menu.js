!function(e){jQuery.fn.crumegamenu=function(n){function i(n){"fade"==l.effect?e(n).children(".dropdown, .megamenu").stop(!0,!0).delay(l.showDelay).fadeIn(l.showSpeed).addClass(l.animation):e(n).children(".dropdown, .megamenu").stop(!0,!0).delay(l.showDelay).slideDown(l.showSpeed).addClass(l.animation)}function t(n){"fade"==l.effect?e(n).children(".dropdown, .megamenu").stop(!0,!0).delay(l.hideDelay).fadeOut(l.hideSpeed).removeClass(l.animation):e(n).children(".dropdown, .megamenu").stop(!0,!0).delay(l.hideDelay).slideUp(l.hideSpeed).removeClass(l.animation),e(n).children(".dropdown, .megamenu").find(".dropdown, .megamenu").stop(!0,!0).delay(l.hideDelay).fadeOut(l.hideSpeed)}function o(){e(h).find(".dropdown, .megamenu").hide(0),navigator.userAgent.match(/Mobi/i)||window.navigator.msMaxTouchPoints>0||"click"==l.trigger?(e(".primary-menu-menu > li > a, .primary-menu ul.dropdown li a").bind("click touchstart",function(n){if(n.stopPropagation(),n.preventDefault(),e(this).parent("li").siblings("li").find(".dropdown, .megamenu").stop(!0,!0).fadeOut(300),"none"==e(this).siblings(".dropdown, .megamenu").css("display"))return i(e(this).parent("li")),!1;t(e(this).parent("li")),window.location.href=e(this).attr("href")}),e(document).bind("click.menu touchstart.menu",function(n){0==e(n.target).closest(".primary-menu").length&&e(".primary-menu-menu").find(".dropdown, .megamenu").fadeOut(300)})):e(f).bind("mouseenter",function(){i(this)}).bind("mouseleave",function(){t(this)})}function d(){var n=e(h).children("li").children(".dropdown, .megamenu");if(e(window).innerWidth()>m)for(var i=e(c).outerWidth(!0),t=0;t<n.length;t++)e(n[t]).parent("li").position().left+e(n[t]).outerWidth()>i?e(n[t]).css("right",0):((i==e(n[t]).outerWidth()||i-e(n[t]).outerWidth()<20)&&e(n[t]).css("left",0),e(n[t]).parent("li").position().left+e(n[t]).outerWidth()<i&&e(n[t]).css("right","auto"))}function r(){e(c).find("li, a").unbind(),e(document).unbind("click.menu touchstart.menu")}function a(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}function s(){if(d(),a()<=m&&p>m&&(r(),l.responsive?(e(h).hide(0),e(u).show(0).click(function(){"none"==e(h).css("display")?e(h).slideDown(l.showSpeed):e(h).slideUp(l.hideSpeed).find(".dropdown, .megamenu").hide(l.hideSpeed)}),e(h).find(".dropdown, .megamenu").hide(0),e(h).find(".indicator").each(function(){e(this).parent("a").siblings(".dropdown, .megamenu").length>0&&e(this).bind("click",function(n){e(h).scrollTo({top:45,left:0},600),"A"==e(this).parent().prop("tagName")&&n.preventDefault(),"none"==e(this).parent("a").siblings(".dropdown, .megamenu").css("display")?(e(this).parent("a").siblings(".dropdown, .megamenu").delay(l.showDelay).slideDown(l.showSpeed),e(this).parent("a").parent("li").siblings("li").find(".dropdown, .megamenu").slideUp(l.hideSpeed)):e(this).parent("a").siblings(".dropdown, .megamenu").slideUp(l.hideSpeed)})})):o()),a()>m&&g<=m&&(r(),e(h).show(0),e(u).hide(0),o()),p=a(),g=a(),/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&a()<m){8==new Number(RegExp.$1)&&(e(u).hide(0),e(h).show(0),r(),o())}}var l;e.extend(l={showSpeed:400,hideSpeed:300,trigger:"hover",showDelay:0,hideDelay:0,effect:"fade",align:"left",responsive:!0,animation:"drop-left",indentChildren:!0,indicatorFirstLevel:"&#xf0d7",indicatorSecondLevel:"&#xf105",scrollable:!0,scrollableMaxHeight:460},n);var u,c=e(this),h=e(c).children(".primary-menu-menu"),f=e(h).find("li"),m=768,p=2e3,g=200;e(h).children("li").children("a").each(function(){e(this).siblings(".dropdown, .megamenu").length>0&&e(this).append("<span class='indicator'>"+l.indicatorFirstLevel+"</span>")}),e(h).find(".dropdown").children("li").children("a").each(function(){e(this).siblings(".dropdown").length>0&&e(this).append("<span class='indicator'>"+l.indicatorSecondLevel+"</span>")}),"right"==l.align&&e(h).addClass("primary-menu-right"),l.indentChildren&&e(h).addClass("primary-menu-indented"),l.responsive&&(e(c).addClass("primary-menu-responsive"),u=e(c).children(".showhide")),l.scrollable&&l.responsive&&e(h).css("max-height",l.scrollableMaxHeight).addClass("scrollable").append("<li class='scrollable-fix'></li>"),s(),e(window).resize(function(){s(),d()})}}(jQuery),function(e){"use strict";(typeof define==="function"&&define.amd?define:function(e,n){if(typeof module!=="undefined"&&module.exports){module.exports=n(require("jquery"))}else{n(jQuery)}})(["jquery"],function(e){function n(n){return e.isFunction(n)||"object"==typeof n?n:{top:n,left:n}}var i=e.scrollTo=function(n,i,t){return e(window).scrollTo(n,i,t)};return i.defaults={axis:"xy",duration:parseFloat(e.fn.jquery)>=1.3?0:1,limit:!0},i.window=function(n){return e(window)._scrollable()},e.fn._scrollable=function(){return this.map(function(){if(!(!this.nodeName||-1!=e.inArray(this.nodeName.toLowerCase(),["iframe","#document","html","body"])))return this;var n=(this.contentWindow||this).document||this.ownerDocument||this;return/webkit/i.test(navigator.userAgent)||"BackCompat"==n.compatMode?n.body:n.documentElement})},e.fn.scrollTo=function(t,o,d){return"object"==typeof o&&(d=o,o=0),"function"==typeof d&&(d={onAfter:d}),"max"==t&&(t=9e9),d=e.extend({},i.defaults,d),o=o||d.duration,d.queue=d.queue&&d.axis.length>1,d.queue&&(o/=2),d.offset=n(d.offset),d.over=n(d.over),this._scrollable().each(function(){function r(e){l.animate(c,o,d.easing,e&&function(){e.call(this,u,d)})}if(null!=t){var a,s=this,l=e(s),u=t,c={},h=l.is("html,body");switch(typeof u){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(u)){u=n(u);break}if(!(u=h?e(u):e(u,this)).length)return;case"object":(u.is||u.style)&&(a=(u=e(u)).offset())}var f=e.isFunction(d.offset)&&d.offset(s,u)||d.offset;e.each(d.axis.split(""),function(e,n){var t="x"==n?"Left":"Top",o=t.toLowerCase(),m="scroll"+t,p=s[m],g=i.max(s,n);if(a)c[m]=a[o]+(h?0:p-l.offset()[o]),d.margin&&(c[m]-=parseInt(u.css("margin"+t))||0,c[m]-=parseInt(u.css("border"+t+"Width"))||0),c[m]+=f[o]||0,d.over[o]&&(c[m]+=u["x"==n?"width":"height"]()*d.over[o]);else{var w=u[o];c[m]=w.slice&&"%"==w.slice(-1)?parseFloat(w)/100*g:w}d.limit&&/^\d+$/.test(c[m])&&(c[m]=c[m]<=0?0:Math.min(c[m],g)),!e&&d.queue&&(p!=c[m]&&r(d.onAfterFirst),delete c[m])}),r(d.onAfter)}}).end()},i.max=function(n,i){var t="x"==i?"Width":"Height",o="scroll"+t;if(!e(n).is("html,body"))return n[o]-e(n)[t.toLowerCase()]();var d="client"+t,r=n.ownerDocument.documentElement,a=n.ownerDocument.body;return Math.max(r[o],a[o])-Math.min(r[d],a[d])},i})}();