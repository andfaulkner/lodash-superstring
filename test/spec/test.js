(function () {
  'use strict';

	describe("lodash-superstring's Jasmine library", function () {
  		it('should be loaded and runnable in the browser', function () {
     		expect(typeof describe).toBe('function');
		});
	});

	describe("lodash library", function(){
		it("should have set the _ namespace", function(){
			expect(typeof _).toBe('function');
		});
		it("should have the lodash functions loaded into the _ namespace", function(){
			expect(typeof _.mixin).toBe('function');
			expect(typeof _.range).toBe('function');
			expect(typeof _.property).toBe('function');
			expect(typeof _.methodOf).toBe('function');
			expect(typeof _.difference).toBe('function');
			expect(typeof _.curry).toBe('function');
		});
	});

	describe("lodash-superstring mixin loader", function(){
		it("should have added the superstring functions to the _ namespace", function(){
			expect(typeof _.convertTextToURI).toBe('function');
			expect(typeof _.replaceStrOnMatch).toBe('function');
		});
	});

})();


  // describe('Give it some context', function () {
  //   describe('maybe a bit more context here', function () {
  //     it('should run here few assertions', function () {
  //       expect(true).toBe(true);
  //     });
  //   });
  // });

  // describe('a test', function(){
  // 	it("should be able to load", function(){
  // 		expect(true).toBe(true);
  // 	});
  // });
