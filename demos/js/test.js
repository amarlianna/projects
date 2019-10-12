window.addEventListener("unhandledrejection", function(e){
    e.preventDefault()
    console.log('捕获到异常：', e);
    return true;
  });
  Promise.reject('promise error');