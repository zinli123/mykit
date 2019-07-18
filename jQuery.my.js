; (function () {
  function jQuery(selector) {
    return new Init(selector);
  }
  function Init(selector) {
    let dom = document.querySelectorAll(selector);
    for (let i = 0; i < dom.length; i++) {
      this[i] = dom[i];
    }
    this.length = dom.length;
  }
  Init.prototype.css = function (propety, value) {
    for (var i = 0; i < this.length; i++) {
      this[i].style[propety] = value + 'px';
    }
  }
  window.$ = window.jQuery = jQuery
})()