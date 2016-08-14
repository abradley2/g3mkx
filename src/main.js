var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    router = require('./router')

$(document).ready(function () {
    Backbone.history.start({pushState: true, root: '/'})
})

$(document).on("click", "a[href][data-link]", function (evt) {
    var link = $(this).attr('href'),
        replace = false

    if ($(this).attr('replace') && $(this).attr('replace') !== 'false') {
        replace = true
    }

    evt.preventDefault()
    router.navigate(link, {trigger: true, replace: replace})
})
