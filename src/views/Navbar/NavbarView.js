var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    hbs = require('handlebars'),
    template = require('./NavbarTemplate.html')

var index = JSON.parse(
    require('../../articles/index.json')
)

function cleanName (name) {
    return name.replace(/_/ig, ' ').replace(/\.\w+$/, '')
}

function generateTree (item, idx, parent, path) {
    if (arguments.length === 1) item = _.clone(item)

    if (Array.isArray(item)) {
        item.forEach( _.partial(generateTree, _, _, item, path) )
    } else {
        if (typeof item === 'string') {
            path = path ? (path + '/' + item) : item
            parent[idx] = {
                name: cleanName(item),
                link: '#article/' + path.replace(/\.\w+$/, '')
            }
        } else if (item.categories) {
            path = path ? (path + '/' + item.name) : item.name
            item.categories.forEach( _.partial(generateTree, _, _, item.categories, path) )
        } else if (item.articles) {
            path = path ? (path + '/' + item.name) : item.name
            item.articles.forEach( _.partial(generateTree, _, _, item.articles, path) )
        }
    }

    return item

}

var NavbarView = Backbone.View.extend({

    events: {
        'click .navbar-toggle': function () {
            this.$('.navbar-collapse').toggleClass('collapse')
        },
        'click a:not([data-toggle="dropdown"])': function () {
            console.log('collapse on link click!')
            this.$('.navbar-collapse').addClass('collapse')
        }
    },

    template: hbs.compile(template),

    initialize: function () {
        this.navigation = generateTree(index.index)
    },

    render: function () {
        this.$el.html(
            this.template({
                navigation: this.navigation
            })
        )

    },

    update: function () {

    },

    remove: function () {
        this.undelegateEvents()
        this.$el.empty()
    }

})


module.exports = NavbarView