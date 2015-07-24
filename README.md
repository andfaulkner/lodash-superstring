# lodash-superstring
Set of plugins for complex string handling - particularly useful for parsing urls with a large number of query parameters


#Work-in-progress


##unescape(collection)  	{{{TESTED}}}
Unescape a string, or each string in an array.
Handles compatilibity issues: uses decodeURIComponent where possible, falls back on unescape when unavailable. Handles nested arrays - recursively unescapes all strings within each, to an unlimited depth. Ignores non-string items in arrays. Returns "" when given null or undefined.
{CHAINABLE}
Examples:

```javascript
		  _.unescape("%2C51%2C49");
		  --> ",51,49"

		  _.unescape([54, "%3D%20true&", "42%2C46", { i: "item"} ]);
		  --> [54, "= true&", "42,46", { i: "item"}]
```

* collection: {String|Array}
* returns {Array|String} - whichever type "collection" parameter was.



###swapByIndex(array, fromIndex, toIndex) {{{TESTED}}}
Swap items in an array, between 2 given indices.
{CHAINABLE}

* array: {Array}
* fromIndex: {Number}
* toIndex: {Number}



###startsWith 		{{{TESTED}}}
Determines whether a collection starts with a given value.

* coll {String|Array} string or array of strings to search.
* matcher {String|Array|RegExp} item to match against coll.
* strict {Boolean} if true, throw error if function given invalid input.
* returns: {Boolean} - true if coll starts with matcher.



###replaceStrOnMatch(collection, matcher, to[, from]) {{{NEEDS TESTING}}}
Replace string (param 'from', or param 'matcher' if no param 'from' provided) within any collection ('coll') item triggering given regular expression or string ('matcher') - with another string (param 'to').
{CHAINABLE}

* collection: {String|Array}
* matcher: {String|RegExp}
* to: {String}
* from: {String}



###rmEndAmpersand(collection) 		{{{TESTED}}}
Convenience function to remove an ampersand from the end of a string, or from the last item in an array.
{CHAINABLE}

* collection: {Array|String}



###rmEndSemicolon(collection) 		{{{TESTED}}}
Convenience function to remove an ampersand from the end of a string, or from the last item in an array.
{CHAINABLE}

* collection: {Array|String}



###unshift(collection, itemToInsert) 		{{{TESTED}}}
Add item to the beginning of a string or array.
Allows for easier lodash chaining, ensures proper type is used for unshift operation
{CHAINABLE}
Example:

```javascript
_.unshift(['a2', 'a3', 'a4'], 'a1');
	--> ['a1', 'a2', 'a3', 'a4']
```



##moveToIndex(collection, fromIndex, toIndex, doMutate)  	{{{TESTED}}}
Move item from one location in an array to another, without overwriting or erasing any values.
Example:

```javascript
var swapTestArr = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'];
_.moveToIndex(swapTestArr, 2, 5));
	//--> [i1,i2,i4,i5,i6,i3,i7]
```

* collection: {Array|String} recipient of the operation
* fromIndex: {Number} index to move the value from
* toIndex: {Number} index to move the value to
* doMutate: {Boolean} if true, mutate collection; otherwise return a new one.
* returns {Array|String} collection with the item moved to its new index



###rmLastCharOnMatch(collection, character)
If the string or the last item in an array matches given char, remove it.
* collection: {String|Array}
* character: {String}



###convertTextToURI(collection)
Unescape an encoded URI in string or array form, then remove spaces from it.
Prepares it for use in an http GET request.
* collection: {String|Array}



###rmMatchPrependStr(array, matcher, itemToInsert)
Insert 'itemToInsert' if matcher hits any text in any array item - as the first item in the array. Remove any array item returning a match. The entire item is removed if any text within the item is matched - not just the matching part.
Example:
```javascript
var moveTestArr = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'];
newArray = _.unshiftIfMatchAndRm(moveTestArr, "4", "i0");
	// --> ['i0', 'i1', 'i2', 'i3', 'i5', 'i6']
```

* Useful for inserting an 'origin' for a relative link (split into an array using _.words) based on the contents of the rest of the link.
