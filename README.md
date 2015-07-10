# lodash-superstring
Set of plugins for complex string handling - particularly useful for parsing urls with a large number of query parameters

#Work-in-progress

###replaceStrInMatchedItem(collection, matcher, to[, from])
Replace string (parameter 'from') of any collection ('coll') item triggering 
given regular expression or string ('matcher'). If no 'from' param provided, 
it replaces whatever was matched by param 'matcher' with string param 'to' 
{CHAINABLE}
* collection: {String|Array}
* matcher: {String|RegExp}
* to: {String}
* from: {String}


###unshift(collection, itemToInsert)
Add item to the beginning of a string or array.
Allows for easier lodash chaining, ensures proper type is used for unshift operation
{CHAINABLE}
Example:

          _.unshift(['a2', 'a3', 'a4'], 'a1');
          --> ['a1', 'a2', 'a3', 'a4']


###rmLastCharOnMatch(collection, character)
If the string or the last item in an array matches given char, remove it.
* collection: {String|Array}
* character: {String}


###convertTextToURI(collection)
Unescape an encoded URI in string or array form, then remove spaces from it.
Prepares it for use in an http GET request.
* collection: {String|Array}


###swapByIndex(array, fromIndex, toIndex)
Swap items in an array, between 2 given indices .
{CHAINABLE}
* array: {Array}
* fromIndex: {Number}
* toIndex: {Number}


###rmEndAmpersand(collection)
Convenience function to remove an ampersand from the end of a string, or from the last item in an array.
{CHAINABLE}
* collection: {Array|String}


###rmEndSemicolon(collection)
Convenience function to remove an ampersand from the end of a string, or from the last item in an array.
{CHAINABLE}
* collection: {Array|String}


###rmMatchPrependStr(array, matcher, itemToInsert)
Insert 'itemToInsert' if matcher hits any text in any array item - as the first item in the array. Remove any array item returning a match. The entire item is removed if any text within the item is matched - not just the matching part. * E.g. 
```javascript
var moveTestArr = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'];

newArray = _.unshiftIfMatchAndRm(moveTestArr, "4", "i0"); 
// --> ['i0', 'i1', 'i2', 'i3', 'i5', 'i6']
```
* Useful for inserting an 'origin' for a relative link (split into an array using _.words) based on the contents of the rest of the link.
