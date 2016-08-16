var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    hbs = require('handlebars'),
    template = require('./ArticleTemplate.html')

var ArticleView = Backbone.View.extend({

    template: hbs.compile(template),

    setArticle: function (articleId) {
        this.article = this.$('#' + articleId).html()
    },

    initialize: function (params) {
        this.setArticle(params.articleId)
    },

    render: function () {
        this.$el.html(
            this.template({ article: this.article })
        )
    },

    update: function (params) {
        this.setArticle(params.articleId)
        this.render()
    },

    remove: function () {
        this.$el.empty()
    }

})

module.exports = ArticleView