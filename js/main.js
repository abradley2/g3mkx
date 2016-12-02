
document.addEventListener('DOMContentLoaded', function () {

	// parse the config (and soften tabs cuz yaml)
	var config = jsyaml.load(
		document.querySelector('[data-role="configuration"]').textContent.replace(/\t/g, '  ')
	)

	var homepage = config.homepage[0]
	var articleConfig = config.articles

	// get the nodes on the navbar for the homepage and the articles
	var homepageNode = document.querySelector('[data-role="homepage"]')
	var navNode = document.querySelector("[data-role='articles']")


	// set the attributes on the homepage link node
	homepageNode.setAttribute('href', '#' + pairVal(homepage))
	homepageNode.innerText = pairKey(homepage)

	// setup the elements in the article navbar node
	articleConfig.forEach(function (category) {

		if (typeof pairVal(category) === 'string') {

			var link = createLink(
				pairKey(category),
				pairVal(category),
				navNode
			)

			navNode.appendChild(link)

		} else if ( Array.isArray(pairVal(category)) ) {

			var dropdown = createDropdown(
				pairKey(category),
				pairVal(category),
				navNode
			)

			navNode.appendChild(dropdown)

		}

	})

	if (!window.location.hash) window.location.hash = '#articles/Index.md'

	window.addEventListener('hashchange', function () {
		removeClass( document.getElementById('article-navbar'), 'in' )
		getArticle( window.location.hash.substr(1) )
	})

	getArticle( window.location.hash.substr(1) )
})

function createLink (title, href) {
	return (function (item) {

		item.appendChild(
			(function (link) {
				link.setAttribute('href', '#' + href)
				link.innerText = title

				return link
			})(document.createElement('a'))
		)

		return item
	})(document.createElement('li'))
}

// lol
function createDropdown (title, articles) {
	return (function (dropdown) {

		// add toggle element to dropdown
		dropdown.appendChild(
			(function (dropdownToggle) {

				dropdownToggle.setAttribute('style', 'cursor:pointer;')
				dropdownToggle.setAttribute('class', 'dropdown-toggle')
				dropdownToggle.setAttribute('data-toggle', 'dropdown')
			
				dropdownToggle.innerHTML = title + '<span class="caret"></span>'

				return dropdownToggle

			})(document.createElement('a'))
		)

		// add menu element to dropdown
		dropdown.appendChild(
			(function (dropdownMenu) {

				dropdownMenu.setAttribute('class', 'dropdown-menu')

				// add items to menu
				articles.forEach(function (article) {

					dropdownMenu.appendChild(
						(function (dropdownItem) {

							// add link to item
							dropdownItem.appendChild(
								(function (dropdownLink) {

									dropdownLink.setAttribute('href', '#' + pairVal(article))
									dropdownLink.innerText = pairKey(article)

									return dropdownLink
								})(document.createElement('a'))
							)

							return dropdownItem
						})(document.createElement('li'))
					)

				})

				return dropdownMenu
			})(document.createElement('ul'))
		)
		
		dropdown.setAttribute('class', 'dropdown')
		
		return dropdown
	})(document.createElement('li'))

}

function pairKey (obj) {
	return Object.keys(obj)[0]
}

function pairVal (obj) {
	return obj[pairKey(obj)]
}


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
