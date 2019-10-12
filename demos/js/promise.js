function Promise(executor) {
	var self = this
	self.status = 'pending' // Promise当前的状态
	self.data = undefined  // Promise的值
	self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
	self.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  
	function resolve(value) {
        // value成功态时接收的终值
        if (value instanceof Promise) {
            value.then(resolve, reject)
            return
        }
  
      // 为什么resolve 加setTimeout?
      // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
      // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
      setTimeout(function(){
        // 调用resolve 回调对应onFulfilled函数
        if (self.status === 'pending') {
          // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
          self.status = 'fulfilled'
          self.data = value
          //执行resolve的回调函数，将value传递到callback中
          self.onResolvedCallback.forEach(callback => callback(value))
        }
      })

    }

    function reject(reason) {
        // reason失败态时接收的拒因
        setTimeout(function(){
        // 调用reject 回调对应onRejected函数
            if (self.status === 'pending') {
                // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
                self.status = 'rejected'
                self.data = reason
                //执行reject的回调函数，将reason传递到callback中
                self.onRejectedCallback.forEach(callback => callback(reason))
            }
        })
    }
  
	try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
	  executor(resolve, reject) // 执行executor
	} catch(e) {
	  reject(e)
	}
}


// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function (onResolve, onReject) {
    let self = this
    let promise2
  
    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolve = typeof onResolve==='function' ? onResolve : function(value){return value}
    onReject = typeof onReject==='function' ? onReject : function(reason){return reason}
    
    if (self.status === 'fulfilled') {
      // 如果promise1(此处即为this/self)的状态已经确定并且是fulfilled，我们调用onResolved
      // 因为考虑到有可能throw，所以我们将其包在try/catch块里
      return promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
            try {
              let x = onResolve(self.data)
              resolvePromise(promise2, x, resolve, reject) // 新的promise resolve 上一个onFulfilled的返回值
            } catch (e) {
              reject(e) // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
            }
          },0)
      })
    }
  
    // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数，就不再做过多解释
    if (self.status === 'rejected') {
      return promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
            try {
              let x = onReject(self.data)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          },0)
      })
    }
  
    if (self.status === 'pending') {
      // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
      // 只能等到Promise的状态确定后，才能确实如何处理。
      // 所以我们需要把我们的 两种情况 的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里 ？？？？
      // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
      return promise2 = new Promise(function(resolve, reject){
        self.onResolvedCallback.push(function(value) {
          try {
            var x = onResolved(self.data)
            
            if (x instanceof Promise) { // 修改。。。
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
            
          } catch (e) {
            reject(e)
          }
        })
  
        self.onRejectedCallback.push(function(reason) {
          try {
            var x = onRejected(self.data)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  
}
  
/*
resolvePromise函数即为根据x的值来决定promise2的状态的函数
也即标准中的[Promise Resolution Procedure](https://promisesaplus.com/#point-47)
x为`promise2 = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值
`resolve`和`reject`实际上是`promise2`的`executor`的两个实参，因为很难挂在其它的地方，所以一并传进来。
相信各位一定可以对照标准把标准转换成代码，这里就只标出代码在标准中对应的位置，只在必要的地方做一些解释
*/
function resolvePromise (promise2, x, resolve, reject) {

    let then 
    let thenCalledOrThrow = false
  
    if (promise2 === x) { // 对应标准2.3.1节
      // 这里可能有童鞋会问，什么时候会触发promise2 === x这个条件，首先我们对标准2.3.1节中的promise2===x在做下解释
      // 条件promise === x ，相当于promise.then之后return了自己，因为then会等待return后的promise，导致自己等待自己，一直处于等待。
      /** 
        比如:
          let p1 = new Promise(function(resolve, reject) {
            setTimeout(() => {reject(1.1)}, 1000)
          })
          let p1then = p1.then(function (value) {
            return p1then
          }, function (err) {
            return p1then
          })
          
          p1then.then(value => {
            console.log('value:', value)
          }, err => {
            console.log('err:', err)
          })
        这段代码就会触发promise2 === x的判断，我们为了promise不一直处于等待状态，根据标准规范，
        这里我们需要抛出'Chaining cycle detected for promise'，即‘循环引用’的错误信息
      */
      reject(new TypeError('Chaining cycle detected for promise!'))
      return
    }
  
    if (x instanceof Promise) { // 对应标准2.3.2节
      // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
      // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
      if (x.status === 'pending') {
        x.then(value => {
          resolvePromise(promise2, value, resolve, reject)
        }, err => {
          reject(err)
        })
      }  else { // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
        x.then(resolve, reject)
      }
      return
    }
  
    if ((x !== null) && ((typeof x === 'function') || (typeof x === 'object'))) {
      try {
        // 2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用
        // 即要判断它的类型，又要调用它，这就是两次读取
        then = x.then //because x.then could be a getter
        if (typeof then === 'function') { // 2.3.3.3
          then.call(x, value => { // 2.3.3.3.1
            if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true
            resolvePromise(promise2, value, resolve, reject) // 2.3.3.3.1
            return
          }, err => { // 2.3.3.3.2
            if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true
            reject(err)
            return
          })
        } else { // 2.3.3.4
          resolve(x)
        }
      } catch (e) { // 2.3.3.2
        if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
        thenCalledOrThrow = true
        reject(e)
        return
      }
    } else { // 2.3.4
      resolve(x)
    }
  
}
  



// 为了下文方便，我们顺便实现一个catch方法
Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}
  