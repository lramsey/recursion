// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
    // your code here
    var classElements = [];
    var num;
    var elementSelector = function(element){
        var selectedElements = [];
        if (element.childNodes === 0){
            var classList = element.classList;
            for (num = 0; num < classList.length; num++){
                if(classList[num] === className){
                    selectedElements.push(element);
                }
            }
        }
        else {
            for(num = 0; num < element.childNodes.length; num++){
                selectedElements.push(elementSelector(element.childNodes[num]));
            }
            return selectedElements;
        }
    };

    classElements = elementSelector(document.body);

    return classElements;
};