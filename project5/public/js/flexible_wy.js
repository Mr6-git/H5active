(function(doc, win) {
    try {
        var docEl = doc.documentElement;
        var isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
        dpr = window.top === window.self ? dpr : 1;
        //被iframe引用时，禁止缩放
        dpr = 1;
        var scale = 1 / dpr;
        var resizeEvt = 'orientationchange'in window ? 'orientationchange' : 'resize';
        docEl.dataset = {};
        docEl.dataset.dpr = dpr;
        var metaEl = doc.createElement('meta');
        metaEl.name = 'viewport';
        metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
        docEl.firstElementChild.appendChild(metaEl);
        var recalc = function() {
            var width = docEl.clientWidth;
            if (width / dpr > 550) {
                width = 550 * dpr;
            }
            // 乘以100，px : rem = 100 : 1
            docEl.style.fontSize = 100 * (width / 550) + 'px';
        };
        recalc()
        if (!doc.addEventListener)
            return;
        win.addEventListener(resizeEvt, recalc, false);
    } catch (error) {

    }
}
)(document, window);