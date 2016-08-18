var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    hbs = require('handlebars'),
    template = require('./HomeTemplate.html')

var index = JSON.parse(
    require('../../articles/index.json')
)

function getFirstArticleId (group, _id) {
    if (arguments.length === 0) {
        group = index.index
    }
    if (typeof group === 'string') {
        return (_id ? (_id + '/') : '') + group.replace(/\.\w+$/, '')
    } else {
        if (Array.isArray(group)) {
            return getFirstArticleId(group[0], _id)
        } else if (group.categories) {
            _id = _id ? (_id + '/' + group.name) : group.name
            return getFirstArticleId(group.categories[0], _id)
        } else if (group.articles) {
            _id = _id ? (_id + '/' + group.name) : group.name
            return getFirstArticleId(group.articles[0], _id)
        }
    }
}

var HomeView = Backbone.View.extend({

    template: hbs.compile(template),

    initialize: function () {
        console.log(getFirstArticleId())
        this.article = document.querySelector( "[data-article-id='" + getFirstArticleId() + "']").innerHTML
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
