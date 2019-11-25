/**** -- RECOMMENDED APPS -- ****/
function jsonpCBRecApps(res) {

    if (typeof res == 'string')
        var res = JSON.parse(res);

    var data_from_site_plug = res['data'].slice(0, 8);
    for (var app = 0; app < data_from_site_plug.length; app++) {

        dqs('#app_url_' + app).setAttribute("href", (data_from_site_plug[app]['rurl']));
        var resizeimg = data_from_site_plug[app]['iurl'].replace('36x36', '128x128');
        var elImg = dqs("#app_image_" + app);
        elImg.src = resizeimg;
        elImg.style.width = '50px';
        elImg.style.height = '50px';

        elImg.style.display = 'block';
        elImg.setAttribute('data-name', data_from_site_plug[app]['brand']);
        elImg.setAttribute('data-url', data_from_site_plug[app]['rurl']);
        elImg.setAttribute('alt', data_from_site_plug[app]['brand']);
        dqs('#recommended_apps_name_' + app).innerText = data_from_site_plug[app]['brand'];
        var container_div = dqs('#fig_div_' + app)

        //if (dqs(".recommended_app_section").find(".panel")) {
        flag_var = 1;
        //}

        if (mobile_width <= 320 && app > 3) {
            container_div.classList.add("fourinch");
        }

    }
    //alert(mobile_width);

    // expand arrow for devices less than 320p
    if (mobile_width <= 320) {
        var nextdiv = document.createElement("a");
        nextdiv.id = 'change_arrowicon'
        nextdiv.className = 'glyph-icon flaticon-down-arrow';
        nextdiv.href = "javascript:show_nextitem();"

        $recommended_app_section.appendChild(nextdiv);
    }

    //            
}
var s = document.createElement('script');
s.src = 'http://kme46.siteplug.com/qlapi?o=kme46&s=88107&u=[domain]&f=json&n=8&i=1&is=36x36&di=&callback=jsonpCBRecApps';
document.body.appendChild(s);
/**** -- RECOMMENDED APPS: close -- ****/


/**** ---- SITE SEARCH BAR  -- ****/
function siteSuggest(ss_keyword) {
    var s = document.createElement('script');
    s.src = 'https://cwc89.siteplug.com/sssapi?o=cwc89&s=61071&kw=' + ss_keyword + '&itype=cs&f=json&i=1&it=1&is=36x36&n=5&af=1&di=' + current_parameter + ' &callback=jsonpCBSearchSugg';
    document.body.appendChild(s);
}
function jsonpCBSearchSugg(res) {
    if (typeof res == 'string')
        var res = JSON.parse(res);


    var data_from_site_suggest = res['ads'];
    if (!res['ads']['ad']) {
        //no result found
        return;
    }

    var site_suggest_ads = dqs('.site_suggest_ads');

    if (Array.isArray(res['ads']['ad'])) {
        //more than one suggestion 

        var data_from_site_suggest = res['ads']['ad'].slice(0, 3);
        //only show max 3 sugg.

        var bulkHTML = ''
        for (var ad = 0; ad < data_from_site_suggest.length; ad++) {
            var htmlStr = `
                        <li class="li_row">
                            <div class="ad_list">
                                <a href="${data_from_site_suggest[ad]['rurl']}">
                                <div id="icon">
                                    <img id="brand_image" class="img-responsive ads-img img-auto" src="${data_from_site_suggest[ad]['iurl']}">
                                </div>
                                <div class="site_ad_title word-wrap">
                                    <h3 id="brand_title" class="word-wrap">${data_from_site_suggest[ad]['brand']}
                                    </h3>
                                    <p id="ad_domain" class="domain_url">
                                    ${data_from_site_suggest[ad]['durl']}
                                    </p>
                                </div>
                                </a>
                            </div>
                        </li>`;

            bulkHTML += htmlStr;

        }

        site_suggest_ads.innerHTML = "";
        site_suggest_ads.innerHTML = bulkHTML;
    } else {

        var data_from_site_suggest = res['ads'];
        var htmlStr = `
                        <li class="li_row">
                            <div class="ad_list">
                                <a href="${data_from_site_suggest['ad']['rurl']}">
                                <div id="icon">
                                    <img id="brand_image" class="img-responsive ads-img img-auto" src="${data_from_site_suggest['ad']['iurl']}">
                                </div>
                                <div class="site_ad_title word-wrap">
                                    <h3 id="brand_title" class="word-wrap">${data_from_site_suggest['ad']['brand']}
                                    </h3>
                                    <p id="ad_domain" class="domain_url">
                                    ${data_from_site_suggest['ad']['durl']}
                                    </p>
                                </div>
                                </a>
                            </div>
                        </li>`;

        site_suggest_ads.innerHTML = "";
        site_suggest_ads.innerHTML = htmlStr;
    }

}
/**** ---- SITE SEARCH BAR : close -- ****/


/**** ---- SITE SEARCH BAR : close -- ****/
/*
 * @ redirect user to the suggested site ( after click / enter in search box )
 */

function jsonpCBSearchRedirect(res) {
    if (typeof res == 'string')
        var res = JSON.parse(res);

    var ads = res['ads'];

    if (ads != "No Ads for given Keyword.") {
        redirectlink = data['ads']['ad']['rurl'];
        //       console.log(redirectlink);
        window.open(redirectlink, "_self");
    } else {
        // window.open("https://www.bing.com/search?mkt=en-in&pc=INDC&q=" + search_query, "_self");
        window.open("http://b.scandid.in/api/searchv3?category=product&type=json&subid=INDA&key=tqw5643rasf3gbag&pid=ind&product_key=" + search_query, "_self");
    }
}

function direct_to_search_link() {
    var redirectlink;
    search_query = document.getElementById('search_in_page').value;

    if (search_query != '') {
        var s = document.createElement('script');
        s.src = 'https://edd31.siteplug.com/sssapi?o=edd31&s=77160&kw=' + search_query + '&itype=cs&f=json&af=0&di=' + current_parameter + '&callback=jsonpCBSearchRedirect';
        document.body.appendChild(s);
    }
}

function deleteInput() {
    var input = document.getElementById('search_in_page');
    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;
        if (key == 8 || key == 46)
            $('.site_suggest_ads').html("");
        return false;
    }
}


function show_nextitem() {

    var current_status = document.getElementsByClassName('fourinch')[0].style.display;
    var arrow_el = document.getElementById("change_arrowicon");
    var x = document.getElementsByClassName('fourinch');

    if (current_status == "none" || current_status == "") {
        arrow_el.className = " glyph-icon flaticon-up-arrow";
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
    } else {
        arrow_el.className = " glyph-icon flaticon-down-arrow";
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }

    }
}


//event handlers
/************ EVENT HANDLER ASSIGNMENTS /************/
//--------------------------------------------//
var $top_news_section = dqs('.top_news_section');
$top_news_section.addEventListener('click', function(e) {
    if (e.target.matches('[id*="top_news_"')) {
        var label = e.target.getAttribute('data-title');
        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'topNewsClicked', label);
        window.location = e.target.getAttribute('data-url');
    }
    // ->delgate for '#top_news_x'
});

$top_news_section.onload = function() {
    setTimeout(function() {
        $('.topnew').css("display", "block");
    }, 500);
};
    

dqs('body').addEventListener('click', function(e) {
    //AmazonAd_Click
    if (e.target.matches('.amazon_ad')) {
        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'AmazonAdClicked');
        console.log("AmazonClicked")
    }

    //WorldCup AdClicked
    if (e.target.matches('.world-cup-ad')) {
        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'WorldCupAdClicked');
        console.log("WorldCupAdClicked")
    }
});

//--------------------------------------------//
var $recommended_app_section = dqs('#recommended_app_section');
$recommended_app_section.addEventListener('click', function(e) {

    if (e.target.matches('.recommended_apps')) {
        var label = e.target.getAttribute('data-name');

        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'RecommendedClicked', label);
        window.location = e.target.getAttribute('data-url');
    }

});

$recommended_app_section.onload = function() {
    setTimeout(function() {
        if (flag_var == 1) {
            $('.reco').css("display", "block");
        }
    }, 500);
};

var $site_suggest_ads = document.querySelector('.site_suggest_ads');
var $search_in_page = document.querySelector('#search_in_page');

//seach textbox 
$search_in_page.addEventListener('keyup', function(e) {
    var ss_keyword = document.getElementById('search_in_page').value;
    $site_suggest_ads.innerHTML = '';

    if (ss_keyword.length > 2) {
        document.querySelector('.site_suggest_box').style.display = 'block'
        siteSuggest(ss_keyword);
    } else {
        document.querySelector('.site_suggest_box').style.display = 'none';
    }
});

$search_in_page.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        direct_to_search_link();
    }
});

$site_suggest_ads.addEventListener('click', function(e) {

    if (e.target && e.target.nodeName == 'LI') {
        var label = $(this).find("a").text();

        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'siteAdClicked', label);
        window.location = $(this).find("a").attr("href");
        // console.log("siteAdClicked")
    }
});

//--------------------------------------------//

// search icon
document.querySelector('#search_button').addEventListener('click', function() {
    direct_to_search_link();
});

document.querySelector("#search").addEventListener('submit', function() {
    var label = $search_in_page.value;

    if (typeof ga != 'undefined')
        ga('send', 'event', 'ClickEvent', 'SearchClicked', label);
});

/*function post_Tracking_Data(t_data) {
    var settings_post = {
        "async": true,
        "crossDomain": true,
        "withCredentials": true,
        "url": "https://track.dailyhunt.in/api/v2/syndication/tracking?partner=indus&ts=" + timestamp + "&puid=" + current_parameter,
        "xhrFields": {
            "withCredentials": true
        },
        "method": "POST",
        "headers": {
            "Authorization": "key=DVj2UsFaFnN+3kn4VHWPS9hUiLCz4eOtblRfAUrDC50=",
            "Signature": hashInBase64_post,
            "Content-Type": "application/json",
        },
        "processData": false,
        "data": t_data
    }

    $.ajax(settings_post).done(function(data) {
        //   console.log("posted successfully");
    });
}*/


setTimeout(function() {

    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-47795566-10', 'auto');
    ga('send', 'pageview');


}, 1200000);



/* helper functions */
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    if(seconds < 0)
        return "Just now";

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    if (seconds > 60) {
        return "59 seconds ago";
    }
    return Math.floor(seconds) + " seconds ago";
}


function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function _extends(){return(_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),n=t&&"IntersectionObserver"in window,r=t&&"classList"in document.createElement("p"),o={elements_selector:"img",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1},a=function(t,e){var n,r=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:r}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:r})}window.dispatchEvent(n)};var i=function(t,e){return t.getAttribute("data-"+e)},s=function(t,e,n){var r="data-"+e;null!==n?t.setAttribute(r,n):t.removeAttribute(r)},c=function(t){return"true"===i(t,"was-processed")},l=function(t,e){return s(t,"ll-timeout",e)},u=function(t){return i(t,"ll-timeout")},d=function(t,e,n,r){t&&(void 0===r?void 0===n?t(e):t(e,n):t(e,n,r))},f=function(t,e){t._loadingCount+=e,0===t._elements.length&&0===t._loadingCount&&d(t._settings.callback_finish,t)},_=function(t){for(var e,n=[],r=0;e=t.children[r];r+=1)"SOURCE"===e.tagName&&n.push(e);return n},v=function(t,e,n){n&&t.setAttribute(e,n)},b=function(t,e){v(t,"sizes",i(t,e.data_sizes)),v(t,"srcset",i(t,e.data_srcset)),v(t,"src",i(t,e.data_src))},m={IMG:function(t,e){var n=t.parentNode;n&&"PICTURE"===n.tagName&&_(n).forEach(function(t){b(t,e)});b(t,e)},IFRAME:function(t,e){v(t,"src",i(t,e.data_src))},VIDEO:function(t,e){_(t).forEach(function(t){v(t,"src",i(t,e.data_src))}),v(t,"src",i(t,e.data_src)),t.load()}},g=function(t,e){var n,r,o=e._settings,a=t.tagName,s=m[a];if(s)return s(t,o),f(e,1),void(e._elements=(n=e._elements,r=t,n.filter(function(t){return t!==r})));!function(t,e){var n=i(t,e.data_src),r=i(t,e.data_bg);n&&(t.style.backgroundImage='url("'.concat(n,'")')),r&&(t.style.backgroundImage=r)}(t,o)},y=function(t,e){r?t.classList.add(e):t.className+=(t.className?" ":"")+e},h=function(t,e){r?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},p=function(t,e,n){t.addEventListener(e,n)},E=function(t,e,n){t.removeEventListener(e,n)},w=function(t,e,n){E(t,"load",e),E(t,"loadeddata",e),E(t,"error",n)},A=function(t,e,n){var r=n._settings,o=e?r.class_loaded:r.class_error,a=e?r.callback_loaded:r.callback_error,i=t.target;h(i,r.class_loading),y(i,o),d(a,i,n),f(n,-1)},I=function(t,e){var n=function n(o){A(o,!0,e),w(t,n,r)},r=function r(o){A(o,!1,e),w(t,n,r)};!function(t,e,n){p(t,"load",e),p(t,"loadeddata",e),p(t,"error",n)}(t,n,r)},k=["IMG","IFRAME","VIDEO"],L=function(t,e){var n=e._observer;S(t,e),n&&e._settings.auto_unobserve&&n.unobserve(t)},O=function(t){var e=u(t);e&&(clearTimeout(e),l(t,null))},x=function(t,e){var n=e._settings.load_delay,r=u(t);r||(r=setTimeout(function(){L(t,e),O(t)},n),l(t,r))},S=function(t,e,n){var r=e._settings;!n&&c(t)||(k.indexOf(t.tagName)>-1&&(I(t,e),y(t,r.class_loading)),g(t,e),function(t){s(t,"was-processed","true")}(t),d(r.callback_reveal,t,e),d(r.callback_set,t,e))},z=function(t){return!!n&&(t._observer=new IntersectionObserver(function(e){e.forEach(function(e){return function(t){return t.isIntersecting||t.intersectionRatio>0}(e)?function(t,e,n){var r=n._settings;d(r.callback_enter,t,e,n),r.load_delay?x(t,n):L(t,n)}(e.target,e,t):function(t,e,n){var r=n._settings;d(r.callback_exit,t,e,n),r.load_delay&&O(t)}(e.target,e,t)})},{root:(e=t._settings).container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}),!0);var e},C=["IMG","IFRAME"],N=function(t,e){return function(t){return t.filter(function(t){return!c(t)})}((n=t||function(t){return t.container.querySelectorAll(t.elements_selector)}(e),Array.prototype.slice.call(n)));var n},M=function(t){var e=t._settings;_toConsumableArray(e.container.querySelectorAll("."+e.class_error)).forEach(function(t){h(t,e.class_error),function(t){s(t,"was-processed",null)}(t)}),t.update()},R=function(e,n){var r;this._settings=function(t){return _extends({},o,t)}(e),this._loadingCount=0,z(this),this.update(n),r=this,t&&window.addEventListener("online",function(t){M(r)})};return R.prototype={update:function(t){var n,r=this,o=this._settings;(this._elements=N(t,o),!e&&this._observer)?(function(t){return t.use_native&&"loading"in HTMLImageElement.prototype}(o)&&((n=this)._elements.forEach(function(t){-1!==C.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),S(t,n))}),this._elements=N(t,o)),this._elements.forEach(function(t){r._observer.observe(t)})):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(t,e){S(t,this,e)},loadAll:function(){var t=this;this._elements.forEach(function(e){L(e,t)})}},t&&function(t,e){if(e)if(e.length)for(var n,r=0;n=e[r];r+=1)a(t,n);else a(t,e)}(R,window.lazyLoadOptions),R});
//# sourceMappingURL=lazyload.min.js.map
