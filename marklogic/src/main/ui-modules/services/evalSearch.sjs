
function get (context, params) {

    let response = {};
    xdmp.log("====== evalSearch ========");
    xdmp.log(params);
    var queryString = params.query;
    var user = params.user;
    var options = {};
    options.userId = xdmp.user(user);
    var ext = {};
    ext.queryString = queryString;
    var query = 'const search = require\("/MarkLogic/appservices/search/search"\);search.search\("'+queryString+'"\);';

    return xdmp.eval(query,ext,options);

}

exports.GET = get;
