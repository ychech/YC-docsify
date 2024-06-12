"use strict";
window.$docsify.plugins = [].concat((function (e, o) {
    e.ready((function () {

        // 确保a在滚动事件监听器之前被定义
        let a;

        // 添加滚动事件监听器
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                if (a) a.style.backgroundColor = 'red'; // 滚动超过100px时改变颜色
            } else {
                if (a) a.style.backgroundColor = c; // 还原为原来的颜色
            }
        });

        const {topBanner: bannerConfig} = o.config;
        if (!bannerConfig) return;

        const t = bannerConfig.defaultTag || "span",
            n = o.compiler.compile(bannerConfig.content),
            c = bannerConfig.backgroundColor || "#deebff",
            i = bannerConfig.textColor || "#091E42",
            r = bannerConfig.linkColor || i,
            l = bannerConfig.textAlign || "center",
            d = bannerConfig.position || "fixed",
            s = bannerConfig.zIndex || "99";

        const u = document.createElement(t);
        u.setAttribute("id", "TOPBANNER");
        u.innerHTML = n; // 先设置内容，再插入到DOM中

        // 插入横幅到body的第一个子节点前
        const y = document.querySelector("body");
        y.insertBefore(u, y.childNodes[0]);

        // 此时u已经是DOM的一部分，所以可以通过querySelector获取
        a = document.querySelector(`${t}#TOPBANNER`);
        a.style.backgroundColor = c;
        a.style.color = i;
        a.style.position = d;
        a.style.zIndex = s; // 注意这里是小写的 zIndex
        a.style.textAlign = l;

        // 假设您有一个关闭按钮，其ID为'close-banner'
        const closeButton = document.querySelector('#close-banner');
        if (closeButton) {
            closeButton.addEventListener("click", function() {
                u.parentNode.removeChild(u);
            });
        }

        // 如果您想改变所有链接的颜色，可以这样做：
        const links = a.querySelectorAll('a');
        links.forEach(function(link) {
            link.style.color = r;
        });

    }));
}), window.$docsify.plugins);