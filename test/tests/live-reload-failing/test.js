var QUnit = require("steal-qunit");

QUnit.module("some module");

QUnit.test("Failing test", function(){
	QUnit.equal(1, 2);
});

QUnit.test("Passing test", function(){
	QUnit.equal(2, 2);
});
