var QUnit = require("steal-qunit");

require("./test-banner");

QUnit.module("A module");

QUnit.test("A test", function(){
	QUnit.ok(true,"assert");
});
