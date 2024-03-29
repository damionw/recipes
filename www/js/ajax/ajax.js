/* DEPRECATED: Use fetch()
    https://blog.openreplay.com/ajax-battle-xmlhttprequest-vs-the-fetch-api
*/

/* USAGE: function my_request(){
    ajaxFunction(
        "/ajax/my_url",

        function(ajax_result){
        },

        function(ajax_exception){
        }
    );
}
*/

function ajaxException(url, message){
    this.typename = "ajaxException";
    this.ajaxException = 1;
    this.message = message;
    this.url = url;
}

ajaxException.prototype.toString = function(){
    return this.typename + "(" + this.url + ") :" + this.message;
}

function ajaxFunction(url, result_callback, error_callback, method, data){
    var ajaxRequest;  // The variable that makes Ajax possible!

    if (method == null || method == undefined) {
        method = "GET";
    }

    if (data == null || data == undefined) {
        data = "";
    }
    else {
        data = JSON.stringify(data);
        method = "POST"; // data being sent in the body requires POST
    }

    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    }
    catch(e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){
                alert("Your browser broke!");
                return false;
            }
        }
    }

    ajaxRequest.onreadystatechange = function(){
        if (ajaxRequest.readyState != 4 ||  typeof (error_callback) != "function"){
            return;
        }
        else if (ajaxRequest.status != 200){
            error_callback(new ajaxException(url, "&lt;unavailable&gt;"));
        }
        else {
            try {
                eval("var value=" + ajaxRequest.responseText);
                result_callback(value);
            }
            catch(exception) {
                error_callback(new ajaxException(url, "&lt;data_error&gt;"));
            }
        }
    }

    ajaxRequest.open(method, url, true); // Don't forget to escape() query string values
    ajaxRequest.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT")
    // ajaxRequest.setRequestHeader('Access-Control-Allow-Headers', '*');
    // ajaxRequest.setRequestHeader('Access-Control-Allow-Origin', '*');

    if (method == "POST") {
        ajaxRequest.setRequestHeader("Content-type", "application/json;charset=UTF-8");
//         ajaxRequest.setRequestHeader("Content-length", data.length);
//         ajaxRequest.setRequestHeader("Connection", "close");
    }

    ajaxRequest.send(data);
}
