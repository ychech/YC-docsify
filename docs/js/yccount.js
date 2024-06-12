//default values
var defaultOptions = {
    countable: true,
    position: "top",
    margin: "10px",
    float: "right",
    fontsize: "0.9em",
    color: "rgb(90,90,90)",
    language: "english",
    isExpected: true,
}

// Docsify plugin functions
function plugin(hook, vm) {
    if (!defaultOptions.countable) {
        return
    }
    let wordsCount
    hook.beforeEach(function (content) {
        // Match regex every time you start parsing .md
        wordsCount = content.match(/([\u4e00-\u9fa5]+?|[a-zA-Z0-9]+)/g).length
        return content
    })
    hook.afterEach(function (html, next) {
        let word = wordsCount + " words"
        let readTime = Math.ceil(wordsCount / 400) + " min"
        let readingRequires = "阅读需要花费";
        //Determine whether to use the Chinese style according to the attribute "language"
        if (defaultOptions.language === "chinese") {
            word = wordsCount + " 字"
            readTime = Math.ceil(wordsCount / 400) + " 分钟"
            str = `${readingRequires} ${readTime}`; // 将阅读需要花费和阅读时间组合在一起

        }

        //add html string
        next(
            `
        ${defaultOptions.position === "bottom" ? html : ""}
        <div style="margin-${defaultOptions.position ? "bottom" : "top"}: ${
                defaultOptions.margin
            };">
            <span style="
                  float: ${defaultOptions.float === "right" ? "right" : "left"};
                  font-size: ${defaultOptions.fontsize};
                  color:${defaultOptions.color};">
            ${str}
            ${defaultOptions.isExpected ? `&nbsp; | &nbsp;${word}` : ""}
            </span>
            <div style="clear: both"></div>
        </div>
        ${defaultOptions.position !== "bottom" ? html : ""}
        `
        )
    })
}

// Docsify plugin options
window.$docsify["count"] = Object.assign(
    defaultOptions,
    window.$docsify["count"]
)
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins)
