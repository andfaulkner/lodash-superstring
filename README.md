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
Add item to the beginning of a string or array
Allows for easier lodash chaining, ensures proper type is used for unshift operation
{CHAINABLE}
Example:

          _.unshift(['a2', 'a3', 'a4'], 'a1');
          --> ['a1', 'a2', 'a3', 'a4']


###rmLastCharOnMatch(collection, character)
If the string or the last item in an array matches given char, remove it
* collection: {String|Array}
* character: {String}


###convertTextToURI(collection)
Unescape an encoded URI in string or array form, then remove spaces from it.
Prepares it for use in an http GET request
* collection: {String|Array}


###swapByIndex(array, fromIndex, toIndex)
Swap items in an array, between 2 given indices 
{CHAINABLE}
* array: {Array}
* fromIndex: {Number}
* toIndex: {Number}


###rmEndAmpersand(collection)


###rmEndSemicolon(collection)


###rmMatchPrependStr(array, matcher, itemToInsert)
