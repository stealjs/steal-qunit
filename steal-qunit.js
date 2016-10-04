"format amd";
define([
	"@loader",
	"qunitjs/qunit/qunit",
	"qunitjs/qunit/qunit.css!"
], function(loader, QUnit){

	if(loader.has("live-reload")) {
		setupLiveReload();
	}

	setupSauceLabsReporting();

	function setupLiveReload(){
		QUnit.done(updateResults);

		// Check to make sure all tests have passed and update the banner class.
		function updateResults() {
			var tests = document.getElementById("qunit-tests").children;
			var node, passed = true;
			for(var i = 0, len = tests.length; i < len; i++) {
				node = tests.item(i);
				removeAllButLast(node, "runtime");
				if(node.className !== "pass") {
					passed = false;
					break;
				}
			}
			document.getElementById("qunit-banner").className = passed ?
				"qunit-pass" : "qunit-fail";

		}

		function removeAllButLast(parent, className){
			var node, nodes = [];
			var children = parent.children;
			for(var i = 0, len = children.length; i < len; i++) {
				node = children.item(i);
				if(node.className === className) nodes.push(node);
			}
			while(nodes.length > 1) {
				node = nodes.shift();
				parent.removeChild(node);
			}
		}
	}

	function setupSauceLabsReporting() {
		var log = [];
		  
		QUnit.done(function (test_results) {
		  var tests = [];
		  for(var i = 0, len = log.length; i < len; i++) {
		    var details = log[i];
		    tests.push({
		      name: details.name,
		      result: details.result,
		      expected: details.expected,
		      actual: details.actual,
		      source: details.source
		    });
		  }
		  test_results.tests = tests;
		  
		  window.global_test_results = test_results;
		});

		QUnit.testStart(function(testDetails){
		  QUnit.log(function(details){
		    if (!details.result) {
		      details.name = testDetails.name;
		      log.push(details);
		    }
		  });
		});
	}

	QUnit.config.autorun = false;
	steal.done().then(function() {
		if (window.Testee && window.Testee.init) {
			Testee.init();
		}
		QUnit.load();
	});

	return QUnit;
});
