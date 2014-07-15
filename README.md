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
