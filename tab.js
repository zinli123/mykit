/**
 *  之前封装好的tab栏的代码
 */
class Tab {
  constructor(options) {
    // options必须是一个对象或者不传,为了可以省略传参和无序传参
    //短路运算:如果左边运算为true,那么整个表达式为true,如果左边为false,那么就继续根据右边的判断是否为true
    options = options || {};
    // 分别给不同的参数设置默认值
    this.navSelector = options.navSelector || '.nav > li';
    this.contentSelector = options.contentSelector || '.content';
    this.type = options.type || 'mouseover';
    this.navClass = options.navClass || 'active';
    this.contentClass = options.contentSelector || 'show';
  }
  // tab栏有哪些方法
  // 需要让对象,调用哪些方法可以实现效果
  addEvent() {
    let _this = this;
    // 获取对应的元素
    let lis = document.querySelectorAll(this.navSelector);
    let contents = document.querySelectorAll(this.contentSelector);
    //注册事件
    lis.forEach((e, i) => {
      e.addEventListener(this.type, function () {
        // 处理tab栏的逻辑
        //排他的设置li的类名
        _this.changeNavStyle(lis, this);
        //根据this的索引,找到对应div
        _this.changeContentStyle(contents, contents[i]);
      })
    })
  }
  // 修改分类的样式的方法
  // 缺少lis , 当的li 
  changeNavStyle(lis, currentLi) {
    lis.forEach(e => {
      e.classList.remove(this.navClass);
    })
    currentLi.classList.add(this.navClass);
  }
  // 修改内容的样式的方法
  changeContentStyle(contents, currentContent) {
    contents.forEach(e => {
      e.classList.remove(this.contentClass);
    })
    //把对应的div显示
    currentContent.classList.add(this.contentClass);
  }
}