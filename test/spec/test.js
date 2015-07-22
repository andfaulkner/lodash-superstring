(function() {
    'use strict';

    var testArr;


    /**
     * Constructor for new test arrays (to prevent effects of array mutation)
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    testArr = function(type) {
        if (typeof type === 'undefined' || type === 'default') {;
        } else if (type === "numbers") {
            return ([4, 2, 5, 256, 8, 4, 1, 56, 12, 1412, 65, 4, 2, 8, 483,
                182, 48, 2181, 29573, 2, 1, 5
            ]);

        } else if (type === "words") {
            return (["aloha", "hello", "bonjour", "wat", "wut", "gopher", "butter", "blub",
                "mug", "spin", "spine", "fracas", "word", "ham"
            ]);

        } else if (type === "sentences") {
            return (["hello world!", "aloha planet!", "bonjour", "wat wat", "wut wut",
                "gopher in a mudhole", "stick of butter", "blub", "mug", "spine",
                "fracas", "word salad", "ham steak", "hamburger"
            ]);
        } else if (type === "chars") {
            return (['b', 'r', 'q', 'z', 'h', 'u', 'n', 'b', 'c', 'z', 'y', 'i', 'o']);
        }
        return (['i1', 'i2', 'i3', 'i4', 'i5', 'i6']);
    };

    /**
     * Check all properties in the array (props) are present in the object (obj), &
     * of the right type (checkObjProperties)
     */
    var checkObjProperties = function checkObjProperties(obj, props, typeExpected) {
        props.forEach(function(prop) {
            expect(obj[prop]).toBeDefined();
            if (typeExpected) {
                expect(typeof obj[prop]).toBe(typeExpected);
            }
        });
    }



    /************************* META-TESTS: Test suite tests ***************************/
    describe("Test suite's pristine array constructor", function() {

        it('- should load a pristine array (it is unaffected by array mutations)', function() {
            var newArray = testArr(),
                newnewArray = testArr();
            newArray.push('i7');
            expect(newArray).not.toBe(newnewArray);
        });

        it('- should outputs a new array every time', function() {
            var newArray2 = testArr();
            expect(testArr()).not.toBe(testArr());
        });

        it("- should fill every array it outputs for a given 'type' w/ the same val.s", function() {
            var newArray2 = testArr(),
                numArray = testArr("numbers"),
                wordArray = testArr("words"),
                sentenceArray = testArr("sentences"),
                charArray = testArr("chars");
            expect(testArr()).toEqual(newArray2);
            expect(testArr("numbers")).toEqual(numArray);
            expect(testArr("words")).toEqual(wordArray);
            expect(testArr("sentences")).toEqual(sentenceArray);
            expect(testArr("chars")).toEqual(charArray);
        });

        it("- should return different test arrays for each type it is given", function() {
            expect(testArr("words")).not.toEqual(testArr("chars"));
            expect(testArr("words")).not.toEqual(testArr("sentences"));
            expect(testArr("words")).not.toEqual(testArr("numbers"));
            expect(testArr("words")).not.toEqual(testArr());
            expect(testArr("numbers")).not.toEqual(testArr("chars"));
            expect(testArr("numbers")).not.toEqual(testArr("sentences"));
            expect(testArr("numbers")).not.toEqual(testArr());
            expect(testArr("chars")).not.toEqual(testArr("sentences"));
            expect(testArr("chars")).not.toEqual(testArr());
            expect(testArr("sentences")).not.toEqual(testArr());
        });

    });

    describe("lodash-superstring's Jasmine library", function() {
        it('- should be loaded and runnable in the browser', function() {
            expect(typeof describe).toBe('function');
        });
    });
    /**********************************************************************************/


    /********************** LOADER TESTS: Did everything load? ************************/
    describe("lodash library", function() {

        it("- should have set the _ namespace", function() {
            expect(_).toBeDefined();
        });

        describe("_ namespace", function() {

            it("- should be of type function", function() {
                expect(typeof _).toBe('function');
            });

            it("- should have the standard lodash functions as methods", function() {
                var ld_fns = ["mixin", "range", "property", "methodOf", "curry", "chain",
                    "range", "difference", "rest", "map", "bind", "pluck", "reduce",
                    "flatten", "drop", "dropRight", "initial", "last", "chunk"
                ];
                ld_fns.forEach(function(fnName) {
                    expect(_[fnName]).toBeDefined();
                    expect(typeof _[fnName]).toBe('function');
                });
            });

            it("- should have the superstring functions mixed into it", function() {
                var l_ssFns = ["replaceStrOnMatch", "convertTextToURI",
                    "moveToIndex", "swapByIndex", "rmEndStrOnMatchEach",
                    "rmEndCharOnMatchEach", "rmEndAmpersand", "rmEndSemicolon",
                    "unescape", "unshift", "unshiftRmMatchedItemOnMatch"
                ];
                checkObjProperties(_, l_ssFns, "function");
                expect(typeof _.convertTextToURI).toBe('function');
                expect(typeof _.replaceStrOnMatch).toBe('function');
            });

        });
    });
    /**********************************************************************************/


    /************* FUNCTION TESTS: Does each function work as expected? ***************/
    describe("lodash-superstring: _.moveToIndex", function() {

        it("- should move an array item for 1st given index to 2nd given index", function() {
            expect(_.moveToIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 2, 5, true))
                .toEqual(['i0', 'i1', 'i3', 'i4', 'i5', 'i2']);
            expect(_.moveToIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 2, true))
                .toEqual(['i1', 'i2', 'i0', 'i3', 'i4', 'i5']);
            expect(_.moveToIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 5, true))
                .toEqual(['i1', 'i2', 'i3', 'i4', 'i5', 'i0']);
        });

        it("- should move a char in a string from 1st given index to 2nd given index", function() {
            expect(_.moveToIndex("myTestString", 2, 5, true))
                .toEqual("myestTString");
            expect(_.moveToIndex("myTestString", 0, 9, true))
                .toEqual("yTestStrimng");
            expect(_.moveToIndex("0123456789", 5, 8, true))
                .toEqual("0123467859");
        });
        //TODO: EDGE CASES

    });

    describe("lodash-superstring: _.swapByIndex", function() {
        it("- should swap array items at 2 given indices with each other", function() {
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 2, 5, true))
                .toEqual(['i0', 'i1', 'i5', 'i3', 'i4', 'i2']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 2, true))
                .toEqual(['i2', 'i1', 'i0', 'i3', 'i4', 'i5']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 5, true))
                .toEqual(['i5', 'i1', 'i2', 'i3', 'i4', 'i0']);
        });

        it("- should work the same way whether given index 1 >, or < given index 2", function() {
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 5, 2, true))
                .toEqual(['i0', 'i1', 'i5', 'i3', 'i4', 'i2']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 5, 0, true))
                .toEqual(['i5', 'i1', 'i2', 'i3', 'i4', 'i0']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 5, 2, true))
                .toEqual(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 2, 5, true));
        });
        //TODO: EDGE CASES

    });

    describe("lodash-superstring: _.startsWith", function() {
        it("- [STR, STR] should be true when a string is searched for a substring it starts with", function() {
            expect(_.startsWith("HelloToAll!", "Hello")).toBe(true);
            expect(_.startsWith("42Aloha!", "42")).toBe(true);
            expect(_.startsWith("'grae'gtiw'", "'gr")).toBe(true);
        });

        it("- [STR, STR] should be false if given string doesn't start w/ given substring", function() {
            expect(_.startsWith("HelloToAll!", "toall")).toBe(false);
            expect(_.startsWith("HelloToAll!", "HellaToAll")).toBe(false);
            expect(_.startsWith("42Aloha!", "4A")).toBe(false);
            expect(_.startsWith("Aloha!", "")).toBe(false);
        });

        it("- [STR, ARR] should be true when string coll searched for an array " +
           "that flattens to a substring that coll starts w/", function() {
           		expect(_.startsWith("HelloToAll!", ["He", "ll", "o"])).toBe(true);
           		expect(_.startsWith("42125452", ["42"])).toBe(true);
           		expect(_.startsWith("42125452", ["42", "125452"])).toBe(true);
        });

        it("- [STR, ARR] should be false when string coll searched for an array " +
           "that doesn't flatten to a substring that coll starts w/", function() {
           		expect(_.startsWith("HelloToAll!", ["Hee", "all", "o"])).toBe(false);
           		expect(_.startsWith("42125452!", ["41"])).toBe(false);
           		expect(_.startsWith("42125452!", [""])).toBe(false);
           		expect(_.startsWith("42125452", ["42", "12", "53"])).toBe(false);
        });

        it("- [ARR, ARR] should be true when arr coll is searched for a substring " +
           "that (when coll flattened) coll starts with", function() {
           		expect(_.startsWith(["He", "ll", "o!"], "Hell")).toBe(true);
          		expect(_.startsWith(["13", "52", "263"], "1")).toBe(true);
          		expect(_.startsWith(["48472"], "48472")).toBe(true);
          		expect(_.startsWith(["om", "nom", "nom"], "omno")).toBe(true);
         });

        it("- [ARR, ARR] should be false when arr coll searched for a substring " +
           "that coll does not start with (when coll is flattened)", function() {
           		expect(_.startsWith(["He", "ll", "o!"], "Bye!")).toBe(false);
          		expect(_.startsWith(["13", "52", "263"], "31")).toBe(false);
          		expect(_.startsWith(["48472"], "484721")).toBe(false);
          		expect(_.startsWith(["48472"], "")).toBe(false);
          		expect(_.startsWith(["om", "nom", "nom"], "nomno")).toBe(false);
         });

        it("- [ARR, REGEX] should be true when arr coll searched for regex that " +
           "matches 1st chars in (flattened) coll; even if multiple matches", function() {
           		var regex1 = new RegExp("oma", 'gi');
          		expect(_.startsWith(["oma", "nom", "nom"], regex1)).toBe(true);
          		expect(_.startsWith(["om", "nom", "nom"], /om/gi)).toBe(true);
          		expect(_.startsWith(["13", "52", "263"], /1352/gi)).toBe(true);
        });

        it("- [ARR, REGEX] should be false when arr coll searched for regex that " +
           "doesn't match the 1st chars in coll (when coll is flattened)", function() {
           		var regex1 = new RegExp("oma", 'gi');
          		expect(_.startsWith(["ooooo", "ooo", "ooooo"], regex1)).toBe(false);
          		expect(_.startsWith(["13", "52", "263"], /421352/gi)).toBe(false);
          		expect(_.startsWith(["om", "nom", "nom"], /rerere/gi)).toBe(false);
        });

        it("- [STR, REGEX] should be true when string coll searched for regex that " +
           "matches the 1st chars in coll; even if multiple matches", function() {
          		expect(_.startsWith("1111111", /111/gi)).toBe(true);
          		expect(_.startsWith("1111111", /.*/gi)).toBe(true);
          		expect(_.startsWith("<input id='itm'>", /\<.*id\=\'itm/gi)).toBe(true);
          		expect(_.startsWith("oomnomnom", /oomnom/gi)).toBe(true);
          		expect(_.startsWith("42131423", /421/gi)).toBe(true);
        });

        it("- [STR, REGEX] should be false when string coll searched for regex that " +
           "doesn't match the 1st chars in coll", function() {
          		expect(_.startsWith("1111111", /222/gi)).toBe(false);
          		expect(_.startsWith("Hello everyone!", /ello/gi)).toBe(false);
          		expect(_.startsWith("42131423", /gir/gi)).toBe(false);
          		expect(_.startsWith("", /.*/gi)).toBe(false);
          		expect(_.startsWith("", /[\s]./gi)).toBe(false);
        });

		it("- should be false if (flattened) matcher is longer than coll (even if " +
		   "all chars in coll match 'matcher' up to the end of coll)", function() {
           		expect(_.startsWith("42125452", ["42", "1254524"])).toBe(false);
           		expect(_.startsWith("HelloToAll!", "HelloToAll! And you!")).toBe(false);
		});

		it("- should be false if (flattened) matcher is longer than coll (even if " +
		   "all chars in coll match 'matcher' up to the end of coll)", function() {
           		expect(_.startsWith("42125452", ["42", "1254524"])).toBe(false);
           		expect(_.startsWith("HelloToAll!", "HelloToAll! And you!")).toBe(false);
		});


    });


    describe("lodash-superstring: _.replaceStrOnMatch", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.convertTextToURI", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.rmEndStrOnMatchEach", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.rmEndCharOnMatchEach", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.rmEndAmpersand", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.rmEndSemicolon", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.unescape", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.unshift", function() {
        //TODO: set up tests
    });

    describe("lodash-superstring: _.unshiftRmMatchedItemOnMatch", function() {
        //TODO: set up tests
    });

    //STILL IN PROGRESS

})();