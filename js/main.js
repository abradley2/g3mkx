if (!window.location.hash) window.location.hash = '#articles/Index.md'

window.addEventListener('hashchange', function () {
    removeClass( document.getElementById('article-navbar'), 'in' )
    getArticle( window.location.hash.substr(1) )
})

document.addEventListener('DOMContentLoaded', function () {
    getArticle( window.location.hash.substr(1) )
})

function getArticleTemplate (url) {
    return document.querySelector('[data-article-url="' + url + '"]')
}

function createArticleTemplate(url, content) {
    var tplNode = document.createElement('template')

    tplNode.setAttribute('data-article-url', url)
    tplNode.innerHTML = marked(content)

    document.getElementById('template-container').appendChild(tplNode)

    return tplNode
}

function setPageArticle (url) {
    var articleTpl = getArticleTemplate(url)

    document.getElementById('article-container').innerHTML = articleTpl.innerHTML
}

function removeClass (elem, className) {
    var newClass = elem.getAttribute('class')
        .split(/\s+/)
        .filter(function (name) {
            return name !== className
        })
        .join(' ')

    elem.setAttribute('class', newClass)
}

function getArticle (url) {
    var xhr

    if (getArticleTemplate(url)) {
        setPageArticle(url)
        return
    }

    xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 400) {
                var articleTpl = getArticleTemplate()

                if (!articleTpl) {
                    articleTpl = createArticleTemplate(url, xhr.response)
                }

                if (window.location.hash.substr(1) === url) {
                    setPageArticle(url)
                }

            } else {
                throw new Error('Could not get article')
            }
        }
    }

    xhr.onerror = function () {
        throw new Error('Xhr error')
    }

    xhr.send()
}