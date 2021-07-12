var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');

exports.get = function (req) {
    var component = portal.getComponent();

    return {
        body: thymeleaf.render(resolve('./site-template.html'), {
            headerRegion: component.regions["header"],
            bodyRegion: component.regions["body"],
            footerRegion: component.regions["footer"],
        })
    };
};