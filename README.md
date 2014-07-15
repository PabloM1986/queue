queue
=====

Asynchronous and synchronous callback queue manager

Usage:
------
```javascript
  var queue = new Queue();
  //synchronous
  queue.add(callback);
  queue.run();
  //asynchronous
  queue.add(function (q) {
     var next = q.async();
     //asynchronous task
     next();//this should occur after the asynchronous task finished successfully
  });

  queue.run();
```
You can define a function to run after the queue is empty. Just override the 'finished' method with your own.

```javascript
  var queue = new Queue();

  queue.finished = function () {
    //do something
  }

  queue.run();
```

The queue is not preserved after it is run. All callbacks already executed will be lost. However if a callback failed, the remaining ones wont fire and will remain queued. You can use queue.clear to empty the queue if this happens.
