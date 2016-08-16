var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    hbs = require('handlebars'),
    template = require('./HomeTemplate.html')

var index = JSON.parse(
    require('../../articles/index.json')
)

function getFirstArticleId (group, _id) {
    if (arguments.length === 0) group = index.categories

    if (Array.isArray(group)) {
        return getFirstArticleId(group[0], _id)
    } else {
        if (group.articles) {
            _id = _id ? (_id + '-' + group.directory) : group.directory
            return getFirstArticleId(group.articles[0], _id)
        } else {
            _id = _id + '-' + group.file.replace(/\.md/ig, '')
            return _id
        }
    }
}

var HomeView = Backbone.View.extend({

    template: hbs.compile(template),

    initialize: function () {
        this.article = $('#' + getFirstArticleId()).html()
    },

    render: function () {
        this.$el.html(
            this.template({article: this.article})
        )
    },

    update: function () {

    },

    remove: function () {
        this.$el.empty()
    }

})

module.exports = HomeView
