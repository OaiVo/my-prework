/**
 * Created by oaivo on 06/10/2016.
 */
var greetings = ['cat', 'dog', 'rat'];
var array=[];
greetings.forEach(function (item) {
    array.push(item + 's');
});
console.log(array);