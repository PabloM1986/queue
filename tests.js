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
		jQuery("#result").append("<p>Sync test passed</p>");
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

			if (result == expected) {
				jQuery("#result").append("<p>Async test passed</p>");
			} else {
				jQuery("#result").append("<p style='color:red;'>Async test failed</p>");
			}
		}, 500);
	});

	testQueue.run();
}