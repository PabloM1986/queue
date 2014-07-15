/**
 * @author Pablo Mescher on 15/07/14.
 */
function testSync () {
	var result = "",
		expected = "1234",
		i;

	var testQueue = new Queue();
	for (i=1;i<=4;i++) {
		testQueue.add(function (i) {
			return function () {
				result += i;
			}
		}(i));
	}
	testQueue.run();
	if (result == expected) {
		jQuery("#result").append("<p style='color:green;'>Sync test passed</p>");
	} else {
		jQuery("#result").append("<p style='color:red'>Sync test failed</p>");
	}
}

function testAsync () {
	var result = "",
		expected = "1234";

	var testQueue = new Queue();

	testQueue.add(function (q) {
		var done = q.async();
		setTimeout(function () {
			result += 1;
			done();
		}, 1000);
	});
	testQueue.add(function (q) {
		var done = q.async();
		setTimeout(function () {
			result += 2;
			done();
		}, 500);
	});
	testQueue.add(function (q) {
		var done = q.async();
		setTimeout(function () {
			result += 3;
			done();
		}, 1000);
	});
	testQueue.add(function (q) {
		var done = q.async();
		setTimeout(function () {
			result += 4;
			done();
		}, 500);
	});

	testQueue.finished = function () {
		if (result == expected) {
			jQuery("#result").append("<p style='color:green;'>Async test passed</p>");
		} else {
			jQuery("#result").append("<p style='color:red;'>Async test failed</p>");
		}
	}

	testQueue.run();
}

function emptyRun () {
	var testQueue = new Queue();

	testQueue.finished = function () {
		jQuery("#result").append("<p style='color:green;'>Empty run passed</p>");
	}

	testQueue.run();
}
function clearResults() {
	jQuery("#result").html("");
}