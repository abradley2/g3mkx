var $ = jQuery = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    router = require('./router')

// require Bootsrap plugins
require('bootstrap/js/dropdown')
require('bootstrap/js/collapse')

// https://github.com/jashkenas/underscore/issues/162
_.mixin({
    clone: function (obj) {
        return (!obj || (typeof obj !== 'object')) ? obj :
            (_.isString(obj)) ? String.prototype.slice.call(obj) :
                (_.isArray(obj)) ? _.map(obj, function (t) { return _.clone(t) }) :
                    _.mapObject(obj, function (val, key) { return _.clone(val) })
    }
})

$(document).ready(function () {
    Backbone.history.start()
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
