/**
 *  目的：
 *    仿照jquery，封装一个js文件
 *    该js文件具备哪些功能
 *      1.获取元素
 *      2.css方法
 *      3.操作类名 addClass/removeClass/toggleClass
 *      4....
 *
 *  jq中获取元素
 *    $(css选择器)
 * */
// 自调用函数的目的是：形成一个局部作用域，把我们自己的代码保护起来，不会被别人的代码影响
; (function () {
  // 第一个要做的是：模仿jq里面获取元素
  // $(css选择器)
  function jQuery(selector) {
    // document.querySelectorAll 返回值是一个伪数组 - 是NodeList构造函数的实例对象
    // let nodeList = document.querySelectorAll(selector);
    return new Init(selector);
  }


  // 我们要给原型加方法，就需要自己写一个构造函数
  function Init(selector) {
    let nodeList = document.querySelectorAll(selector);
    // 遍历nodeList伪数组，把里面的每一个都拿出来，作为我自己的伪数组的元素
    for (let i = 0; i < nodeList.length; i++) {
      // console.log(nodeList[i]);
      this[i] = nodeList[i];
    }
    // 给伪数组加一个长度属性
    this.length = nodeList.length;
  }


  // 很多的方法，都会遍历伪数组的，就先封装遍历伪数组的方法
  Init.prototype.each = function (callback) {
    for (let i = 0; i < this.length; i++) {
      // 在遍历里面的逻辑是不确定的 - 传回调函数进来
      callback(i, this);
    }
  }


  /**
   * jq的css方法，有两个功能
   *    设置css样式
   *      jq对象.css(属性名,属性值)
   *    获取css样式
   *      jq对象.css(属性名)
   * 
   *  */
  Init.prototype.css = function (property, value) {
    //如果没有传第二个参数,就是获取
    if (value == undefined) {
      return window.getComputedStyle(this[0])[property];
    } else {
      // 有一个数组，里面存储了所有的需要带单位的属性名
      // 简单处理带单位的数组
      let pxArr = ['width', 'height', 'top', 'left'];
      //实现设置
      //把伪数组中的每一个都遍历,设置它的css样式属性
      //元素对象.style.css属性名 = 新的值;
      for (let i = 0; i < this.length; i++) {
        //console.log(this[i]);
        //把要带单位的属性和不带单位的属性区分开
        if (pxArr.indexOf(property) !== -1) {
          //判断是否带了px
          if (value.toString().indexOf('px') === -1) {
            this[i].style[property] = value + 'px';
          } else {
            this[i].style[property] = value;
          }
        } else {
          this[i].style[property] = value;
        }
      }
      // 最后返回this，用于实现链式编程
      return this;
    }
  }


  // 实现addClass功能
  /**
   *  jq里面的addClass
   *    jq对象.addClass(类名)
   * 
   */
  Init.prototype.addClass = function (className) {
    // 循环的遍历伪数组，把里面的每个元素都实现类名添加
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add(className);
    }
    return this;
  }


  /**
   * 封装移除类名的方法
   * 
   */
  Init.prototype.toggleClass = function (className) {
    this.each(function (i, e) {
      e.classList.toggle(className);
    })
  }


  window.$ = window.jQuery = jQuery;
})();