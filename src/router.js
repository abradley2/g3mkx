var Backbone = require('backbone'),
    BackboneViewMediator = require('backbone-view-mediator')

var viewMediator = new BackboneViewMediator({
    el: '#app',
    layout: require('./layout.html'),
    views: {
        'NavbarView': require('./views/Navbar/NavbarView'),
        'HomeView': require('./views/Home/HomeView'),
        'ArticleView': require('./views/Article/ArticleView')
    }
})

var Router = Backbone.Router.extend({
    routes: {
        ''                                      : 'HomeRoute',
        'article/:name'                         : 'ArticleRoute',
        'article/:category/:name'               : 'ArticleRoute',
        'article/:category/:subcategory/:name'  : 'ArticleRoute'
    },
    HomeRoute: function () {
        viewMediator.render({
            'NavbarView': '#navbar-region',
            'HomeView': '#main-region'
        })
    },
    ArticleRoute: function () {
        var articleId = Array.prototype.slice.call(arguments).filter(function (arg) {
            return arg
        }).join('/')

        viewMediator.render({
            'NavbarView': '#navbar-region',
            'ArticleView': {
                el: '#main-region',
                params: {
                    articleId: articleId
                }
            } 
        })
    }
})

module.exports = new Router()
