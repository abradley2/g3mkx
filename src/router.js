var Backbone = require('backbone'),
    BackboneViewMediator = require('backbone-view-mediator')

var viewMediator = new BackboneViewMediator({
    el: '#app',
    layout: require('./layout.html'),
    views: {
        'HomeView': require('./views/Home/HomeView'),
        'AboutView': require('./views/About/AboutView')
    }
})

const Router = Backbone.Router.extend({
    routes: {
        '': 'HomeRoute',
        'about': 'AboutRoute'
    },
    HomeRoute: function () {
        viewMediator.render({
            'HomeView': '#main-region'
        })
    },
    AboutRoute: function () {
        viewMediator.render({
            'AboutView': '#main-region'
        })
    }
})

module.exports = new Router()
