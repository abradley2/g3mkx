var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    hbs = require('handlebars'),
    template = require('./NavbarTemplate.html')

var index = JSON.parse(
    require('../../articles/index.json')
)

console.log('index = ',index)

var NavbarView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {

    },

    update: function () {

    },

    remove: function () {
        this.$el.empty()
    }

})


module.exports = NavbarView