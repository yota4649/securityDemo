//import jsearch from '/MarkLogic/jsearch.mjs';

// GET
//
// This function returns a document node corresponding to each
// user-defined parameter in order to demonstrate the following
// aspects of implementing REST extensions:
// - Returning multiple documents
// - Overriding the default response code
// - Setting additional response headers
//
function get(context, params) {
  
  context.outputTypes = [];

  var queryString = params.query;
  var user = params.user;

  var options = {};
  options.userId=xdmp.user(user);

  var ext = {};
  //ext.queryString="nobody";

  var str = 'import jsearch from "/MarkLogic/jsearch.mjs";jsearch.documents().where(cts.andQuery([cts.parse("'+queryString+'"), cts.collectionQuery("data")])).slice(0,10).map(match => match.document).result()';

  var queryResult = xdmp.eval(str, ext, options );
  let outResults = queryResult.toObject()[0].results;

  return outResults;
};



// You MUST use fn.error in exactly this way to return an error to the
// client. Raising exceptions or calling fn.error in another manner
// returns a 500 (Internal Server Error) response to the client.
function returnErrToClient(statusCode, statusMsg, body)
{
  fn.error(null, 'RESTAPI-SRVEXERR', 
           Sequence.from([statusCode, statusMsg, body]));
  // unreachable - control does not return from fn.error.
};


// Include an export for each method supported by your extension.
exports.GET = get;