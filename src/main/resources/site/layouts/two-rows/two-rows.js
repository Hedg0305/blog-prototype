var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');

exports.get = function (req) {
    var component = portal.getComponent();

    return {
        body: thymeleaf.render(resolve('./two-rows.html'), {
            upperRegion: component.regions["upper"],
            bottomRegion: component.regions["bottom"],
        })
    };
};