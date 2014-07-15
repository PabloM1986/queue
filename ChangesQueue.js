/**
 * Created by Pablo Mescher
 *
 * Asynchronous and synchronous callback queue manager
 *
 * Usage:
 * var queue = new Queue();
 * //synchronous
 * queue.add(callback);
 * queue.run();
 *
 * //asynchronous
 * queue.add(function (q) {
 *     var next = q.async();
 *     //asynchronous task
 *     next();//this should occur after the asynchronous task finished successfully
 * });
 *
 * queue.run();
 */

function Queue () {
	this._queue = [];
	this._async = false;
	this.isRunning = false;
}

Queue.prototype.async = function () {
	var self = this;
	self._async = true;
	return function () {
		self.next();
	}
};

Queue.prototype.abort = function () {
	this.isRunning = false;
};

Queue.prototype.run = function () {
	var current = this._queue.shift();
	if (current) {
		this.isRunning = true;
		do {
			current(this);
		} while (!this._async && (current = this._queue.shift()));
	} else {
		this.finished();
	}
};

Queue.prototype.next = function () {
	this._async = false;
	if (this.isRunning) {
		if (this._queue.length > 0) {
			this._queue.shift()(this);
		} else {
			this.isRunning = false;
			this.finished();
		}
	} else {
		throw new Error("Execution aborted unexpectedly");
	}
};

Queue.prototype.add = function (callback) {
	if (typeof callback !== "function") {
		throw new Error("Callback must be a function");
	}
	this._queue.push(callback);
};

Queue.prototype.clear = function () {
	this._queue = [];
};

Queue.prototype.finished = function () {};