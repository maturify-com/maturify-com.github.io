$(function(){"use strict";$(".subscribe-form").on("submit",function(t){t.preventDefault();var i=$(this),n=$.trim(i.find('input[name="email"]').val()),e=i.attr("action");$.post(e,{email:n}).done(function(){i.html('<h4 class="subscribe-title" style="margin-bottom: 25px; line-height: 56px;">Thank you for subscription!</h4>').fadeTo(300,1)})})});