// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
    var converter = function(str){
        if(typeof str === 'string'){
        return '"' + str + '"';
        }
        else{
            return "" + str;
        }
    };
    var stringy;
    if (Array.isArray(obj)){
        stringy = "[";
        for(var num = 0; num<obj.length; num++){
            if(typeof obj[num] === 'object'){
                stringy += stringifyJSON(obj[num]) + ',';
            }
            else {
                stringy += converter(obj[num]) + ',';
            }
        }
        stringy = stringy.substr(0, stringy.length-1);
        stringy += ']';
    }
    else if (typeof obj === 'object'){
        stringy = '{';
        for (var key in obj){
            if(typeof obj[key] === 'object'){
                stringy += converter(key) + ':' + stringifyJSON(obj[key]) +',';
            }
            else {
                stringy += converter(key) + ":" + converter(obj[key]) + ',';
            }
        }
        stringy = stringy.substr(0, stringy.length - 1);
        stringy += '}';
    }
    else{
        stringy = converter(obj);
    }
    return stringy;
};