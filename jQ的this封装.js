; (function () {
  function jQuery(selector) {
    return new Init(selector);
  }

  function Init(selector) {
    let dom = document.querySelectorAll(selector);
    for (let i = 0; i < dom.length; i++) {
      this[i] = dom[i]
    }
    this.length = dom.length;
  }

  Init.prototype.each = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback(i, this[i]);
    }
  }

  Init.prototype.css = function (property, value) {
    if (value != undefined) {
      // 设置样式操作
      /*
      this.each(function (i, e) {
        e.style[property] = value;
      });
      */

      /*
      this.each((i, e) => {
        console.log(this);
        this[i].style[property] = value;
      });
      */

      this.each(function () {
        this.style[property] = value;
        console.log(this);
      })
    }
  }
}
}) ()