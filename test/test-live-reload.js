var QUnit = require("steal-qunit");
var F = require("funcunit");
var liveReloadTest = require("live-reload-testing");

F.attach(QUnit);

QUnit.module("live-reload", {
	setup: function(assert){
		var done = assert.async();
		F.open("//tests/live-reload/test.html", function(){
			done();
		});
	},
	teardown: function(assert){
		var done = assert.async();
		liveReloadTest.reset().then(function(){
			done();
		});
	}
});

QUnit.test("a passing test becomes failing", function(){
	F("#qunit-banner").exists().hasClass("qunit-pass",  true, "the test is passing to start");

	F(function(){
		var address = "test/tests/live-reload/mod.js";
		var content = "module.exports = 1;";

		liveReloadTest.put(address, content).then(null, function(){
			QUnit.ok(false, "live reload did not work");
			QUnit.start();
		});
	});

	F("#qunit-banner").hasClass("qunit-fail", true, "and now it is failing");
});
