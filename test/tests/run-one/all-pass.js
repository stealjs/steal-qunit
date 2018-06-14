var QUnit = require("steal-qunit");

QUnit.module("some module");

QUnit.test("First test", function(){
	QUnit.ok(true, "test one");
});

QUnit.test("Second test", function(){
	QUnit.ok(true, "test two");
});
