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
        ''                          : 'HomeRoute',
        'article/:category/:name'   : 'ArticleRoute'
    },
    HomeRoute: function () {
        viewMediator.render({
            'NavbarView': '#navbar-region',
            'HomeView': '#main-region'
        })
    },
    ArticleRoute: function (category, name) {
        viewMediator.render({
            'NavbarView': '#navbar-region',
            'ArticleView': {
                el: '#main-region',
                params: {
                    articleId: category + '-' + name
                }
            } 
        })
    }
})

module.exports = new Router()
