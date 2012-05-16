// JavaScript Document
(function($) {
    $.extend({
    	singleLogin: function(role, options){
				var options = options||null,
				userid = userid||null;
    			switch(role){
					case "init":
					console.log('init');
						var defaults = {
							loginPage:'login.html',
							logoutClass:'.logout',
							life:7,
							success:function(){
								return null;
							},
							failure:function(){
								if($.singleLogin.options.loginPage != window.location){
									window.location = $.singleLogin.options.loginPage;
								}
							},
							set:function(){
								return null;
							},
							logout:function(){
								if($.singleLogin.options.loginPage != window.location){
									window.location = $.singleLogin.options.loginPage;
								}
							},
							cookie:'singleLogin',
							forcePort:'',
							root: calcRoot()
						};
						options = $.extend({},defaults,options);
						$.singleLogin.options=options;
						function calcRoot(){
								var domainTest = /[a-zA-Z]/;
								var root = "";
								if(domainTest.test(document.domain)){
									root = document.domain.split('.');
									root = '.'+root[root.length-2]+'.'+root[root.length-1];
								} else {
									root = window.location.hostname;
								}
								return root;
							}
						return true;
						break;
					case "logout":
						$.cookie($.singleLogin.options.cookie,null,{expires:$.singleLogin.options.life,path:'/',domain:$.singleLogin.options.root});
						$.singleLogin.options.logout();
						return null;
						break;
					case "set":
						$.cookie($.singleLogin.options.cookie,options,{expires:$.singleLogin.options.life,path:'/',domain:$.singleLogin.options.root});
						$.singleLogin.options.set();
						return null;
						break;
					case "check":
						if(typeof options !== "undefined"){
							$.singleLogin('init',options);
							
						}
						if($.cookie($.singleLogin.options.cookie) != null){
							$.singleLogin.userid = $.cookie($.singleLogin.options.cookie);
							$.singleLogin.options.success();
						} else {
							$.singleLogin.options.failure();
							return null
						}
						$($.singleLogin.options.logoutClass).click(function(){
							$.singleLogin('logout');
							return null;
						});
						return $.singleLogin.userid;
						break;
				}
    	},
		cookie: function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
      }
    });
})(jQuery);