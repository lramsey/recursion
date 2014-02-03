// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
    var stringValidator = function(str) {
        var str2;
        var str3;
        if(str.indexOf('"') > -1 && str.indexOf('\\') > -1){
            if(str.indexOf('"') < str.indexOf('\\')){
                str2 = str.substr(0, str.indexOf('"')) + '\\' + '"';
                str3 = str.substr(str.indexOf('"')+1);
                return str2 + stringValidator(str3);
            }
            else {
                str2 = str.substr(0, str.indexOf('\\')) + '\\\\';
                str3 = str.substr(str.indexOf('\\') + 1);
                return str2 + stringValidator(str3);
            }
        }
        else if (str.indexOf('"') > -1){
            str2 = str.substr(0, str.indexOf('"')) + '\\' + '"';
            str3 = str.substr(str.indexOf('"')+1);
            return str2 + stringValidator(str3);
        }
        else if(str.indexOf('\\') > -1) {
            str2 = str.substr(0, str.indexOf('\\')) + '\\\\';
            str3 = str.substr(str.indexOf('\\') + 1);
            return str2 + stringValidator(str3);
        }
        else {
            return str;
        }
    };

    var converter = function(str){
        if(typeof str === 'string'){
            str = stringValidator(str);
            return '"' + str + '"';
        }
        else if (typeof str !== 'function' && typeof str !== 'undefined'){
            return '' + str;
        }
    };
    var stringy;
    if (Array.isArray(obj)){
        stringy = '[';
        for(var num = 0; num<obj.length; num++){
            if(typeof obj[num] === 'object' && obj !== null){
                stringy += stringifyJSON(obj[num]) + ',';
            }
            else if (typeof obj[num] !== 'function' && typeof obj[num] !== 'undefined') {
                stringy += converter(obj[num]) + ',';
            }
            else{
                stringy+=null + ',';
            }
        }
        stringy = stringy.substr(0, stringy.length-1);
        stringy += ']';
        if (stringy.length === 1){
            stringy = '[]';
        }
    }
    else if (typeof obj === 'object' && obj !== null){
        stringy = '{';
        for (var key in obj){
            if(typeof obj[key] === 'object' && obj !== null){
                stringy += converter(key) + ':' + stringifyJSON(obj[key]) +',';
            }
            else if (typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
                stringy += converter(key) + ':' + converter(obj[key]) + ',';
            }
        }
        stringy = stringy.substr(0, stringy.length - 1);
        stringy += '}';
        if (stringy.length === 1){
            stringy = '{}';
        }
    }
    else{
        stringy = converter(obj);
    }
    return stringy;
};