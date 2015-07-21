(function() {
    'use strict';

    var testArr;


    /**
     * Constructor for new test arrays (to prevent effects of array mutation)
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    testArr = function(type) {
        if (typeof type === 'undefined' || type === 'default') { ;
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

        it('always loads a pristine array (it is unaffected by array mutations)', function() {
            var newArray = testArr(),
                newnewArray = testArr();
            newArray.push('i7');
            expect(newArray).not.toBe(newnewArray);
        });

        it('outputs a new array every time', function() {
            var newArray2 = testArr();
            expect(testArr()).not.toBe(testArr());
        });

        it("fills every array it outputs for a given 'type' with the same values", function() {
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

        it("returns different test arrays for each type it is given", function() {
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
        it('should be loaded and runnable in the browser', function() {
            expect(typeof describe).toBe('function');
        });
    });
    /**********************************************************************************/


    /********************** LOADER TESTS: Did everything load? ************************/
    describe("lodash library", function() {

        it("should have set the _ namespace", function() {
            expect(_).toBeDefined();
        });

        describe("_ namespace", function() {

            it("should be of type function", function() {
                expect(typeof _).toBe('function');
            });

            it("should have the standard lodash functions as methods", function() {
                var ld_fns = ["mixin", "range", "property", "methodOf", "curry", "chain",
                    "range", "difference", "rest", "map", "bind", "pluck", "reduce",
                    "flatten", "drop", "dropRight", "initial", "last", "chunk"
                ];
                ld_fns.forEach(function(fnName) {
                    expect(_[fnName]).toBeDefined();
                    expect(typeof _[fnName]).toBe('function');
                });
            });

	        it("should have the superstring functions mixed into it", function() {
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

        it("should move an array item for 1st given index to 2nd given index", function() {
            expect(_.moveToIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 2, 5, true))
            		.toEqual(['i0', 'i1', 'i3', 'i4', 'i5', 'i2']);
            expect(_.moveToIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 2, true))
            		.toEqual(['i1', 'i2', 'i0', 'i3', 'i4', 'i5']);
            expect(_.moveToIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 5, true))
            		.toEqual(['i1', 'i2', 'i3', 'i4', 'i5', 'i0']);
        });

        it("should move a char in a string from 1st given index to 2nd given index", function() {
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
        it("should swap array items at 2 given indices with each other", function() {
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 2, 5, true))
            		.toEqual(['i0', 'i1', 'i5', 'i3', 'i4', 'i2']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 2, true))
            		.toEqual(['i2', 'i1', 'i0', 'i3', 'i4', 'i5']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 0, 5, true))
            		.toEqual(['i5', 'i1', 'i2', 'i3', 'i4', 'i0']);
        });

        it("should work the same way whether given index 1 >, or < given index 2", function() {
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 5, 2, true))
            		.toEqual(['i0', 'i1', 'i5', 'i3', 'i4', 'i2']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 5, 0, true))
            		.toEqual(['i5', 'i1', 'i2', 'i3', 'i4', 'i0']);
            expect(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 5, 2, true))
            		.toEqual(_.swapByIndex(['i0', 'i1', 'i2', 'i3', 'i4', 'i5'], 2, 5, true));
        });
       	//TODO: EDGE CASES

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