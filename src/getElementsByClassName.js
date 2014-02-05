// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
    // your code here
    var classElements = [];
    
    var hasClass = function(element){
        if (element.classList !== undefined){
            if(element.classList.contains(className)){
                classElements.push(element);
            }
        }
    };
    
    var elementSelector = function(item){
        hasClass(item);
        if(item.childNodes.length > 0){
            for(var num = 0; num < item.childNodes.length; num++){
                var childNode = item.childNodes[num];
                if(childNode.childNodes.length > 0){
                    elementSelector(childNode);
                }
                else {
                    hasClass(childNode);
                }
            }
        }
    };

    elementSelector(document.body);

    return classElements;
};