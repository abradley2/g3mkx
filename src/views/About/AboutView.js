var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    hbs = require('handlebars'),
    template = require('./AboutTemplate.html')

module.exports = Backbone.View.extend({

    template: hbs.compile(template),

    initialize: function () {

    },

    render: function () {
        this.$el.html(
            this.template()
        )
    },

    update: function () {

    },

    remove: function () {
        this.$el.empty()
    }

})
