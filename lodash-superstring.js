/**
 * Lodash mixins for advanced string handling and parsing
 * [[[ WORK IN PROGRESS ]]]
 *
 * @author Andrew Faulkner  <andfaulkner@gmail.com>\
 * @license Apache 2.0
 */

/**
 * UMD exporter
 */
(function(root, factory) {
    'use strict';

    // AMD (register as an anonymous module);
    if (typeof define === 'function' && define.amd) {
        // Makes global for when loaded scripts seek 1 despite use of AMD loader
        define(['b'], function(b) {
            return (root._ = factory());
        });

        // Node.
    } else if (typeof exports === 'object') {
        module.exports = factory(require('b'));

        // Browser globals (where root is the global 'window' object)
    } else {
        root._ = factory();
    }

    /**
     * Module begins
     * @return {Object} lodash object (_) with
     */
}(this, function lodashSuperstring() {
    'use strict';

    var lodash = lodash || _ || {};

    //Ensure lodash is loaded, return if it's not.
    if (typeof _ === 'undefined' || !_ || !_.mixin) {
        console.log('no lodash!');
        return {};
    }

    _.mixin({


        /**
         * @function _.convertToURI             [[TESTED: STRINGS, ARRAYS]]
         *
         * 'unescape' an encoded URI in string form, then rm spaces from it.
         * Prepares it for use in an http GET request
         *
         * @example var str = "?ListNo=12%2C46&Find=%20Key%20%3D%20true";
         *                  _.convertToURI(str);
         *                           ----> "?ListNo=12,46&Find=Key=true"
         * @example var arr = "['?', 'ListNo=12%2C46&', 'Find=%20Key%20%3D%20true']
         *                  _.convertToURI(arr);
         *                           ----> "?ListNo=12,46&Find=Key=true"
         *
         * @param {String|Array} 'raw' uri
         * @returns {String}
         */
        convertTextToURI: function(coll) {
            if (_.isString(coll)) {
                return _.unescape(coll).replace(/\ /g, "");
            } else if (_.isArray(coll)) {
                return _.reduce(coll, function(output, item) {
                    return output + _.unescape(item).replace(/\ /g, "");
                });
            }
        },


        /**
         * @function swapByIndex                [[TESTED: ARRAYS]]
         * Move item from one location in an array to another, without overwriting
         * or erasing any values.
         *
         * @example var moveTestArr = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'];
         *          _.move(moveTestArr, 2, 5));
         *            --> [i1,i2,i4,i5,i6,i3,i7]
         *
         * @param arr {Array} array to perform the operation on
         * @param fromIndex {Number} index to move the value from
         * @param toIndex {Number} index to move the value to
         *
         * @returns {Array} collection with the item moved to its new index
         */
        swapByIndex: function(arr, fromIndex, toIndex) {
            var item1, item2;
            if (_.isArray(arr)) {
                item1 = arr[fromIndex];
                item2 = arr[toIndex];
                arr[fromIndex] = item2;
                arr[toIndex] = item1;
            }
            return arr;
        },

        /**
         * Determines whether a collection starts with a given value.
         *
         * @param coll {String|Array} string or array of strings to search
         * @param matcher {String|Array|RegExp} item to match against coll.
         * @returns Boolean - true if coll starts with matcher.
         */
        startsWith: function startsWith(coll, matcher, strict, onDebug) {
            var flatMatcher, flatColl, collStart, matched, matchIndex, matchOne;

            //if coll & matcher both = "", return true; if not strict (else false)
            if (coll === "" && matcher === "") return (!!strict);

            //thorough test for valid input
            if (typeof coll === 'undefined' || typeof matcher === 'undefined' ||
                    coll === "" || matcher === "" || !coll || !matcher ||
                    (coll.length === 1 && coll[0] === "") ||
                    (matcher.length === 1 && matcher[0] === "")){
                if (!!strict) {
                    throw "_.startsWith function received invalid input." +
                        "  coll: " + coll + "; matcher: " + matcher;
                }
                return false;
            }

            if (_.isArray(coll)) {

                if (_.isString(matcher)) {
                    flatColl = coll.join("");
                    collStart = flatColl.slice(0, matcher.length);
                    return (collStart === matcher);

                } else if (_.isRegExp(matcher)) {
                    matched = coll.join("").match(matcher);
                    return (typeof matched !== 'undefined' && !!matched && matched !== -1);

                } else if (_.isArray(matcher)) {
                    /*_*/ if (onDebug) alert("here: coll = arr, matcher = arr");
                    return matcher.every(function(item, i, arr) {
                        return (item === coll[i]);
                    });
                }

            } else if (_.isString(coll)) {

                if (_.isString(matcher)) {
                    collStart = coll.slice(0, matcher.length);
                    return (collStart === matcher);

                } else if (_.isRegExp(matcher)) {
                    matched = coll.match(matcher);
                    matchOne = !!matched ? matched[0] : false;
                    return (coll.indexOf(matchOne) === 0);

                } else if (_.isArray(matcher)) {
                    flatMatcher = matcher.join("");
                    collStart = coll.slice(0, flatMatcher.length);
                    return (collStart === flatMatcher);
                }
            }

            return false;
        },

        /**
         * @function moveToIndex
         *
         * Move item from one location in an array to another, without overwriting
         * or erasing any values.
         *
         * @example var swapTestArr = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'];
         *          _.moveToIndex(swapTestArr, 2, 5));
         *            --> [i1,i2,i4,i5,i6,i3,i7]
         *
         * @param {Array|String} collection - recipient of the operation
         * @param {Number} fromIndex - index to move the value from
         * @param {Number} toIndex - index to move the value to
         * @param {Boolean} doMutate - if true, mutate collection; otherwise return a new 1. .
         * @param {Boolean} literalIndices - if true, indices start at 1 rather than 0.
         *
         * @returns {Array|String} collection with the item moved to its new index
         */
        moveToIndex: function(collection, fromIndex, toIndex, doMutate) {
            var coll;
            var wasString;

            if (!collection) {
                console.log("_.swapByIndex: array or string must be passed to function");
                return false;
            }

            if (!doMutate) coll = _.clone(collection);
            else coll = collection;

            if (typeof collection === 'string') {
                wasString = true;
                coll = collection.split("");
            }

            if (coll.length <= toIndex || coll.length <= fromIndex ||
                toIndex < 0 || fromIndex < 0) {
                console.log("_.swapByIndex: invalid indices: out of array bounds.");
                return coll;
            }

            if (_.isString(coll)) coll.split("");

            if (_.isArray(coll)) coll.splice(toIndex, 0, coll.splice(fromIndex, 1)[0]);
            if (_.isString(collection)) coll.join(",");

            return (!!wasString) ? coll.join("") : coll;
        },

        /**
         * @function _.replaceStrOnMatch            [[TESTED: STRINGS, ARRAYS]]
         *
         * Replace str 'from' of any 'coll' item triggering 'matcher'. If no
         * 'from' param provided, replace str 'matcher' with str 'to' {CHAINABLE}
         *
         * @example var arr = ["?Op=false", "FormNoList=42", "Search=false"];
         *          _.replaceStrOnMatch(arr, 'false', 'true')
         *                  ----> ["?Op=true', 'FormNoList=42', 'Search=true']
         * @example var arr = ["?Op=false", "FormNoList=42", "Search=false"];
         *          _.replaceStrOnMatch(arr, 'Search', 'true', 'false)
         *                  ----> ['?Op=false', 'FormNoList=42', 'Search=true']
         *
         * @param coll {String|Array} collection to match and replace
         * @param matcher {String|Regexp} string to search for in the collection
         * @param to {String} string to which string 'from' (or string 'matcher' if
         *                    no from param is provided) is changed
         * @param from {String} string in coll to replace with string 'to' {OPTIONAL}
         *
         * @returns {String|Array} collection following the replacement
         */
        replaceStrOnMatch: function(coll, matcher, to, from) {
            if (typeof from === 'undefined') {
                from = matcher;
            }
            if (_.isString(coll)) {
                if (coll.match(matcher) !== -1) {
                    if (coll.match(from) !== -1) {
                        return (coll.replace(from, to));
                    } else {
                        return coll;
                    }
                }
            }
            if (_.isArray(coll)) {
                return _.map(coll, function(val) {
                    return ((val.toString().match(matcher) !== -1) ?
                        val.toString().replace(((from) ? from : matcher), to) :
                        val.toString());
                });
            }
        },


        /**
         * @function _.rmEndStrOnMatchEach
         * [[REQUIRES TESTING]
         * Remove any array items ending in a given string {CHAINABLE}
         */
        rmEndStrOnMatchEach: function(array, endString) {
            return _.filter(array, function(v) {
                return ((_.takeRight(v,
                        _.size(endString)).join("") === endString) ?
                    false : v);
            })
        },


        /**
         * @function rmEndCharOnMatchEach           [[TESTED: STRINGS, ARRAYS]]
         * If the str or the last item in an arr matches given char, rm it
         *
         * @example _.rmEndCharOnMatchEach("some string;");
         *                  --> "some string"
         * @example _.rmEndCharOnMatchEach(['arr str 1', 'arr str 2', 'arr str 3X');
         *                  --> ['arr str 1', 'arr str 2', 'arr str 3']
         *
         * @param coll {String||Array} data to remove character from end of
         * @param char {String} character to remove
         *
         * @returns {String||Array} with the character removed
         */
        rmEndCharOnMatchEach: function(coll, char) {
            if (_.isArray(coll)) {
                if ((_.last(_.last(coll))) === char) {
                    var retColl = _.initial(coll);
                    retColl.push(_.initial(_.last(coll)).join(''));
                    return retColl;
                }
            } else if (typeof coll === "string") {
                if ((_.last(coll)) === char) {
                    return (_.initial(coll).join(""));
                }
            }
            return coll;
        },


        /**
         * @function _.rmEndAmpersand       [[TESTED: STRINGS, ARRAYS]]
         * Convenience fn to rm an '&' from the end of a str, or from the
         * end of the final string in an array {CHAINABLE}
         *
         * @param coll {String|Array} collection to remove the "&" from
         * @returns collection with the "&" removed
         */
        rmEndAmpersand: function(coll) {
            if (_.isArray(coll) || _.isString(coll)) {
                if (_.last(coll) === "&") {
                    return (_.initial(coll).join(""));
                }
//                return _.rmEndStrOnMatchEach(coll, "&").join("");
            }
            return coll;
        },


        /**
         * @function _.rmEndSemicolon       [[TESTED: STRINGS, ARRAYS]]
         *
         * Convenience fn to rm a ';' from the end of a str, or from the
         * end of the final string in an array {CHAINABLE}
         *
         * @param coll {String|Array} collection to remove the ";" from
         * @returns collection with the ";" removed
         */
        rmEndSemicolon: function(coll) {
            if (_.isArray(coll) || _.isString(coll)) {
                if (_.last(coll) === ";") {
                    return (_.initial(coll).join(""));
                }
                // return _.rmEndStrOnMatchEach(coll, ';').join('');
            }
            return coll;
        },


        /**
         * @function _.unescape     [[TESTED: STRINGS, ARRAYS]]
         *
         * Unescape a string, or each string in an array. {CHAINABLE}
         * Handles compatilibity issues: uses decodeURIComponent where
         * possible, falls back on unescape when unavailable.
         *
         * @param coll {String|Array} string or array of strings to unescape
         * @returns {String|Array} unescaped string or array of strings
         */
        unescape: function(coll){
            var decodeMethod;

            if (typeof coll === undefined){
                return "";
            }

            if (typeof decodeURIComponent !== 'undefined') {
                decodeMethod = decodeURIComponent;
            } else {
                decodeMethod = unescape;
            }

            if (_.isArray(coll)){
                return (coll.map(function(item){
                    return decodeMethod(item);
                }));
            }
            return (decodeMethod(coll));
        },


        /**
         * @function _.unshift              [[TESTED: STRINGS, ARRAYS]]
         * Add item to the beginning of a string or array.
         *
         * @example _.unshift('mple string', 'exa');
         *                  --> "example string"
         * @example _.unshift(['a2', 'a3', 'a4'], 'a1');
         *                  --> ['a1', 'a2', 'a3', 'a4']
         *
         * @param coll {Array|String} collection to add item to the start of
         * @param itemToIns {String} item to add to the start of the collection
         * @return {Array|String} collection with item added to the start
         */
        unshift: function(coll, itemToIns) {
            if (typeof itemToIns !== 'undefined') {
                if (_.isArray(coll)) {
                    coll.unshift(itemToIns);
                } else if (_.isString(coll)) {
                    coll = itemToIns + coll;
                }
                return coll;
            } else {
                console.log("_.unshift failed - no item to insert provided");
                return coll;
            }
        },


        /**
         * @function _.unshiftRmMatchedItemOnMatch
         * Ins itemToIns if matcher hits any text in any arr item (1 insert
         * total). Rm any item ret a match: full item, not just matched text
         *
         * @param arr {Array}
         * @param matcher {String|RegExp}
         * @param itemToIns {String} Item to potentially insert at arr start
         */
        unshiftRmMatchedItemOnMatch: function(arr, matcher, itemToIns) {
            var rmArr = _.remove(arr, function(v) {
                return (v.match(matcher)) ?
                    true : false;
            });
            if (_.size(rmArr) > 0) {
                _.without(arr.unshift(itemToIns), rmArr);
            }
            return arr;
        }


    });

    lodash = _;

    return _;

}));