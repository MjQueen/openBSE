"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contextmenu = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.function.bind");

var _resources = require("./lib/resources");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 上下文菜单类
 * @alias openBSE.Contextmenu
 * @description 上下文菜单对象。用于实现一个弹幕上下文菜单。
 */
var Contextmenu =
/**
 * 创建弹幕引擎对象的上下文菜单。
 * @param {openBSE.BulletScreenEngine} bulletScreenEngine - 弹幕引擎对象：一个弹幕 {@link openBSE.BulletScreenEngine} 对象。要添加上下文菜单的
 * @param {Element} element - 上下文菜单元素：当显示上下文菜单时要显示的 div 。有关 Element 接口的信息请参阅MDN [Element]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element} 。
 * @param {number} [layer=10] - 弹幕层级：当显示上下文菜单或鼠标指向弹幕时弹幕要移动到的层级。有关弹幕层级的详细说明请参阅 {@link openBSE~options} 结构。
 * @param {boolean} [pause=true] - 是否暂停：当鼠标指向弹幕或单开上下文菜单时弹幕是否暂停移动/播放。
 */
function Contextmenu(bulletScreenEngine, element) {
  var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var pause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  _classCallCheck(this, Contextmenu);

  if (_typeof(bulletScreenEngine) != 'object' || _typeof(element) != 'object' || typeof pause != 'boolean' || typeof layer != 'number' && layer != null) throw new TypeError(_resources.Resources.PARAMETERS_TYPE_ERROR);
  element.bulletScreenEvent = null;

  var _getContextmenuState = function _getContextmenuState() {
    return contextmenu.style.display != 'none';
  };
  /**
   * 获取上下文菜单的状态
   * @function
   * @returns {boolean} 指示上下文菜单是否正处于激活/显示状态。
   */


  this.getContextmenuState = _getContextmenuState;
  /**
   * 获取激活上下文菜单的弹幕的弹幕事件结构
   * @returns {openBSE~BulletScreenEvent} 弹幕事件结构：一个 {@link openBSE~BulletScreenEvent} 结构。
   */

  this.getBulletScreenEvent = function () {
    return element.bulletScreenEvent;
  };
  /**
   * 关闭上下文菜单：如果当前上下文菜单正处于激活/显示状态则立即关闭。
   */


  this.closeContextmenu = function () {
    if (_getContextmenuState()) {
      element.style.display = 'none';
      if (pause) element.bulletScreenEvent.setPlayState(true);
      element.bulletScreenEvent.setBulletScreen({
        _contextmenu: false
      }, false);
      element.bulletScreenEvent = null;
    }
  };

  element.style.position = 'fixed';
  element.style.display = 'none';

  element.oncontextmenu = function () {
    return false;
  };

  var _closeContextmenu = function _closeContextmenu(e) {
    if (_getContextmenuState() && e.target != element) {
      element.style.display = 'none';
      if (pause) element.bulletScreenEvent.setPlayState(true);
      element.bulletScreenEvent.setBulletScreen({
        _contextmenu: false
      }, false);
      element.bulletScreenEvent = null;
      if (e.type === 'click') e.stopPropagation();
    }
  };

  window.addEventListener('click', _closeContextmenu, true);
  window.addEventListener('contextmenu', _closeContextmenu, true);
  window.addEventListener('scroll', _closeContextmenu, true);
  bulletScreenEngine.bind('contextmenu', function (e) {
    e.setBulletScreen({
      layer: layer,
      _contextmenu: true
    }, layer != null);
    if (pause) e.setPlayState(false);
    element.style.display = '';
    var top = e.clientY,
        left = e.clientX;
    if (top + element.clientHeight > document.documentElement.clientHeight) top -= element.clientHeight;
    if (left + element.clientWidth > document.documentElement.clientWidth) left -= element.clientWidth;
    element.style.top = "".concat(top, "px");
    element.style.left = "".concat(left, "px");
    element.bulletScreenEvent = e;
  });
  bulletScreenEngine.bind('mouseenter', function (e) {
    if (layer != null) e.setBulletScreen({
      layer: layer
    }, true);
    if (pause) e.setPlayState(false);
  });
  bulletScreenEngine.bind('mouseleave', function (e) {
    if (!e.getBulletScreen()._contextmenu && pause) e.setPlayState(true);
  });
};

exports.Contextmenu = Contextmenu;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRleHRtZW51LmpzIl0sIm5hbWVzIjpbIkNvbnRleHRtZW51IiwiYnVsbGV0U2NyZWVuRW5naW5lIiwiZWxlbWVudCIsImxheWVyIiwicGF1c2UiLCJUeXBlRXJyb3IiLCJSZXNvdXJjZXMiLCJQQVJBTUVURVJTX1RZUEVfRVJST1IiLCJidWxsZXRTY3JlZW5FdmVudCIsIl9nZXRDb250ZXh0bWVudVN0YXRlIiwiY29udGV4dG1lbnUiLCJzdHlsZSIsImRpc3BsYXkiLCJnZXRDb250ZXh0bWVudVN0YXRlIiwiZ2V0QnVsbGV0U2NyZWVuRXZlbnQiLCJjbG9zZUNvbnRleHRtZW51Iiwic2V0UGxheVN0YXRlIiwic2V0QnVsbGV0U2NyZWVuIiwiX2NvbnRleHRtZW51IiwicG9zaXRpb24iLCJvbmNvbnRleHRtZW51IiwiX2Nsb3NlQ29udGV4dG1lbnUiLCJlIiwidGFyZ2V0IiwidHlwZSIsInN0b3BQcm9wYWdhdGlvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwidG9wIiwiY2xpZW50WSIsImxlZnQiLCJjbGllbnRYIiwiY2xpZW50SGVpZ2h0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImdldEJ1bGxldFNjcmVlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUNBOzs7OztJQUtNQSxXO0FBQ0Y7Ozs7Ozs7QUFPQSxxQkFBWUMsa0JBQVosRUFBZ0NDLE9BQWhDLEVBQW1FO0FBQUEsTUFBMUJDLEtBQTBCLHVFQUFsQixFQUFrQjtBQUFBLE1BQWRDLEtBQWMsdUVBQU4sSUFBTTs7QUFBQTs7QUFDL0QsTUFDSSxRQUFPSCxrQkFBUCxLQUE2QixRQUE3QixJQUNBLFFBQU9DLE9BQVAsS0FBa0IsUUFEbEIsSUFFQSxPQUFPRSxLQUFQLElBQWdCLFNBRmhCLElBR0MsT0FBT0QsS0FBUCxJQUFnQixRQUFoQixJQUE0QkEsS0FBSyxJQUFJLElBSjFDLEVBS0UsTUFBTSxJQUFJRSxTQUFKLENBQWNDLHFCQUFVQyxxQkFBeEIsQ0FBTjtBQUVGTCxFQUFBQSxPQUFPLENBQUNNLGlCQUFSLEdBQTRCLElBQTVCOztBQUVBLE1BQUlDLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUI7QUFBQSxXQUFNQyxXQUFXLENBQUNDLEtBQVosQ0FBa0JDLE9BQWxCLElBQTZCLE1BQW5DO0FBQUEsR0FBM0I7QUFDQTs7Ozs7OztBQUtBLE9BQUtDLG1CQUFMLEdBQTJCSixvQkFBM0I7QUFDQTs7Ozs7QUFJQSxPQUFLSyxvQkFBTCxHQUE0QjtBQUFBLFdBQU1aLE9BQU8sQ0FBQ00saUJBQWQ7QUFBQSxHQUE1QjtBQUNBOzs7OztBQUdBLE9BQUtPLGdCQUFMLEdBQXdCLFlBQU07QUFDMUIsUUFBSU4sb0JBQW9CLEVBQXhCLEVBQTRCO0FBQ3hCUCxNQUFBQSxPQUFPLENBQUNTLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixNQUF4QjtBQUNBLFVBQUlSLEtBQUosRUFBV0YsT0FBTyxDQUFDTSxpQkFBUixDQUEwQlEsWUFBMUIsQ0FBdUMsSUFBdkM7QUFDWGQsTUFBQUEsT0FBTyxDQUFDTSxpQkFBUixDQUEwQlMsZUFBMUIsQ0FBMEM7QUFBRUMsUUFBQUEsWUFBWSxFQUFFO0FBQWhCLE9BQTFDLEVBQW1FLEtBQW5FO0FBQ0FoQixNQUFBQSxPQUFPLENBQUNNLGlCQUFSLEdBQTRCLElBQTVCO0FBQ0g7QUFDSixHQVBEOztBQVNBTixFQUFBQSxPQUFPLENBQUNTLEtBQVIsQ0FBY1EsUUFBZCxHQUF5QixPQUF6QjtBQUNBakIsRUFBQUEsT0FBTyxDQUFDUyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBeEI7O0FBQ0FWLEVBQUFBLE9BQU8sQ0FBQ2tCLGFBQVIsR0FBd0I7QUFBQSxXQUFNLEtBQU47QUFBQSxHQUF4Qjs7QUFFQSxNQUFJQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQVVDLENBQVYsRUFBYTtBQUNqQyxRQUFJYixvQkFBb0IsTUFBTWEsQ0FBQyxDQUFDQyxNQUFGLElBQVlyQixPQUExQyxFQUFtRDtBQUMvQ0EsTUFBQUEsT0FBTyxDQUFDUyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBeEI7QUFDQSxVQUFJUixLQUFKLEVBQVdGLE9BQU8sQ0FBQ00saUJBQVIsQ0FBMEJRLFlBQTFCLENBQXVDLElBQXZDO0FBQ1hkLE1BQUFBLE9BQU8sQ0FBQ00saUJBQVIsQ0FBMEJTLGVBQTFCLENBQTBDO0FBQUVDLFFBQUFBLFlBQVksRUFBRTtBQUFoQixPQUExQyxFQUFtRSxLQUFuRTtBQUNBaEIsTUFBQUEsT0FBTyxDQUFDTSxpQkFBUixHQUE0QixJQUE1QjtBQUNBLFVBQUljLENBQUMsQ0FBQ0UsSUFBRixLQUFXLE9BQWYsRUFBd0JGLENBQUMsQ0FBQ0csZUFBRjtBQUMzQjtBQUNKLEdBUkQ7O0FBU0FDLEVBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNOLGlCQUFqQyxFQUFvRCxJQUFwRDtBQUNBSyxFQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDTixpQkFBdkMsRUFBMEQsSUFBMUQ7QUFDQUssRUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ04saUJBQWxDLEVBQXFELElBQXJEO0FBRUFwQixFQUFBQSxrQkFBa0IsQ0FBQzJCLElBQW5CLENBQXdCLGFBQXhCLEVBQXVDLFVBQVVOLENBQVYsRUFBYTtBQUNoREEsSUFBQUEsQ0FBQyxDQUFDTCxlQUFGLENBQWtCO0FBQUVkLE1BQUFBLEtBQUssRUFBRUEsS0FBVDtBQUFnQmUsTUFBQUEsWUFBWSxFQUFFO0FBQTlCLEtBQWxCLEVBQXdEZixLQUFLLElBQUksSUFBakU7QUFDQSxRQUFJQyxLQUFKLEVBQVdrQixDQUFDLENBQUNOLFlBQUYsQ0FBZSxLQUFmO0FBQ1hkLElBQUFBLE9BQU8sQ0FBQ1MsS0FBUixDQUFjQyxPQUFkLEdBQXdCLEVBQXhCO0FBQ0EsUUFBSWlCLEdBQUcsR0FBR1AsQ0FBQyxDQUFDUSxPQUFaO0FBQUEsUUFBcUJDLElBQUksR0FBR1QsQ0FBQyxDQUFDVSxPQUE5QjtBQUNBLFFBQUlILEdBQUcsR0FBRzNCLE9BQU8sQ0FBQytCLFlBQWQsR0FBNkJDLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkYsWUFBMUQsRUFBd0VKLEdBQUcsSUFBSTNCLE9BQU8sQ0FBQytCLFlBQWY7QUFDeEUsUUFBSUYsSUFBSSxHQUFHN0IsT0FBTyxDQUFDa0MsV0FBZixHQUE2QkYsUUFBUSxDQUFDQyxlQUFULENBQXlCQyxXQUExRCxFQUF1RUwsSUFBSSxJQUFJN0IsT0FBTyxDQUFDa0MsV0FBaEI7QUFDdkVsQyxJQUFBQSxPQUFPLENBQUNTLEtBQVIsQ0FBY2tCLEdBQWQsYUFBdUJBLEdBQXZCO0FBQ0EzQixJQUFBQSxPQUFPLENBQUNTLEtBQVIsQ0FBY29CLElBQWQsYUFBd0JBLElBQXhCO0FBQ0E3QixJQUFBQSxPQUFPLENBQUNNLGlCQUFSLEdBQTRCYyxDQUE1QjtBQUNILEdBVkQ7QUFZQXJCLEVBQUFBLGtCQUFrQixDQUFDMkIsSUFBbkIsQ0FBd0IsWUFBeEIsRUFBc0MsVUFBVU4sQ0FBVixFQUFhO0FBQy9DLFFBQUluQixLQUFLLElBQUksSUFBYixFQUFtQm1CLENBQUMsQ0FBQ0wsZUFBRixDQUFrQjtBQUFFZCxNQUFBQSxLQUFLLEVBQUVBO0FBQVQsS0FBbEIsRUFBb0MsSUFBcEM7QUFDbkIsUUFBSUMsS0FBSixFQUFXa0IsQ0FBQyxDQUFDTixZQUFGLENBQWUsS0FBZjtBQUNkLEdBSEQ7QUFLQWYsRUFBQUEsa0JBQWtCLENBQUMyQixJQUFuQixDQUF3QixZQUF4QixFQUFzQyxVQUFVTixDQUFWLEVBQWE7QUFDL0MsUUFBSSxDQUFDQSxDQUFDLENBQUNlLGVBQUYsR0FBb0JuQixZQUFyQixJQUFxQ2QsS0FBekMsRUFBZ0RrQixDQUFDLENBQUNOLFlBQUYsQ0FBZSxJQUFmO0FBQ25ELEdBRkQ7QUFHSCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzb3VyY2VzIH0gZnJvbSAnLi9saWIvcmVzb3VyY2VzJ1xyXG4vKipcclxuICog5LiK5LiL5paH6I+c5Y2V57G7XHJcbiAqIEBhbGlhcyBvcGVuQlNFLkNvbnRleHRtZW51XHJcbiAqIEBkZXNjcmlwdGlvbiDkuIrkuIvmlofoj5zljZXlr7nosaHjgILnlKjkuo7lrp7njrDkuIDkuKrlvLnluZXkuIrkuIvmlofoj5zljZXjgIJcclxuICovXHJcbmNsYXNzIENvbnRleHRtZW51IHtcclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65by55bmV5byV5pOO5a+56LGh55qE5LiK5LiL5paH6I+c5Y2V44CCXHJcbiAgICAgKiBAcGFyYW0ge29wZW5CU0UuQnVsbGV0U2NyZWVuRW5naW5lfSBidWxsZXRTY3JlZW5FbmdpbmUgLSDlvLnluZXlvJXmk47lr7nosaHvvJrkuIDkuKrlvLnluZUge0BsaW5rIG9wZW5CU0UuQnVsbGV0U2NyZWVuRW5naW5lfSDlr7nosaHjgILopoHmt7vliqDkuIrkuIvmlofoj5zljZXnmoRcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIOS4iuS4i+aWh+iPnOWNleWFg+e0oO+8muW9k+aYvuekuuS4iuS4i+aWh+iPnOWNleaXtuimgeaYvuekuueahCBkaXYg44CC5pyJ5YWzIEVsZW1lbnQg5o6l5Y+j55qE5L+h5oGv6K+35Y+C6ZiFTUROIFtFbGVtZW50XXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9BUEkvRWxlbWVudH0g44CCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xheWVyPTEwXSAtIOW8ueW5leWxgue6p++8muW9k+aYvuekuuS4iuS4i+aWh+iPnOWNleaIlum8oOagh+aMh+WQkeW8ueW5leaXtuW8ueW5leimgeenu+WKqOWIsOeahOWxgue6p+OAguacieWFs+W8ueW5leWxgue6p+eahOivpue7huivtOaYjuivt+WPgumYhSB7QGxpbmsgb3BlbkJTRX5vcHRpb25zfSDnu5PmnoTjgIJcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3BhdXNlPXRydWVdIC0g5piv5ZCm5pqC5YGc77ya5b2T6byg5qCH5oyH5ZCR5by55bmV5oiW5Y2V5byA5LiK5LiL5paH6I+c5Y2V5pe25by55bmV5piv5ZCm5pqC5YGc56e75YqoL+aSreaUvuOAglxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihidWxsZXRTY3JlZW5FbmdpbmUsIGVsZW1lbnQsIGxheWVyID0gMTAsIHBhdXNlID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdHlwZW9mIGJ1bGxldFNjcmVlbkVuZ2luZSAhPSAnb2JqZWN0JyB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgZWxlbWVudCAhPSAnb2JqZWN0JyB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgcGF1c2UgIT0gJ2Jvb2xlYW4nIHx8XHJcbiAgICAgICAgICAgICh0eXBlb2YgbGF5ZXIgIT0gJ251bWJlcicgJiYgbGF5ZXIgIT0gbnVsbClcclxuICAgICAgICApIHRocm93IG5ldyBUeXBlRXJyb3IoUmVzb3VyY2VzLlBBUkFNRVRFUlNfVFlQRV9FUlJPUik7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYnVsbGV0U2NyZWVuRXZlbnQgPSBudWxsO1xyXG5cclxuICAgICAgICBsZXQgX2dldENvbnRleHRtZW51U3RhdGUgPSAoKSA9PiBjb250ZXh0bWVudS5zdHlsZS5kaXNwbGF5ICE9ICdub25lJztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bkuIrkuIvmlofoj5zljZXnmoTnirbmgIFcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0g5oyH56S65LiK5LiL5paH6I+c5Y2V5piv5ZCm5q2j5aSE5LqO5r+A5rS7L+aYvuekuueKtuaAgeOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0Q29udGV4dG1lbnVTdGF0ZSA9IF9nZXRDb250ZXh0bWVudVN0YXRlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPlua/gOa0u+S4iuS4i+aWh+iPnOWNleeahOW8ueW5leeahOW8ueW5leS6i+S7tue7k+aehFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtvcGVuQlNFfkJ1bGxldFNjcmVlbkV2ZW50fSDlvLnluZXkuovku7bnu5PmnoTvvJrkuIDkuKoge0BsaW5rIG9wZW5CU0V+QnVsbGV0U2NyZWVuRXZlbnR9IOe7k+aehOOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0QnVsbGV0U2NyZWVuRXZlbnQgPSAoKSA9PiBlbGVtZW50LmJ1bGxldFNjcmVlbkV2ZW50O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWFs+mXreS4iuS4i+aWh+iPnOWNle+8muWmguaenOW9k+WJjeS4iuS4i+aWh+iPnOWNleato+WkhOS6jua/gOa0uy/mmL7npLrnirbmgIHliJnnq4vljbPlhbPpl63jgIJcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNsb3NlQ29udGV4dG1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChfZ2V0Q29udGV4dG1lbnVTdGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF1c2UpIGVsZW1lbnQuYnVsbGV0U2NyZWVuRXZlbnQuc2V0UGxheVN0YXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5idWxsZXRTY3JlZW5FdmVudC5zZXRCdWxsZXRTY3JlZW4oeyBfY29udGV4dG1lbnU6IGZhbHNlIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYnVsbGV0U2NyZWVuRXZlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZWxlbWVudC5vbmNvbnRleHRtZW51ID0gKCkgPT4gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBfY2xvc2VDb250ZXh0bWVudSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChfZ2V0Q29udGV4dG1lbnVTdGF0ZSgpICYmIGUudGFyZ2V0ICE9IGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGlmIChwYXVzZSkgZWxlbWVudC5idWxsZXRTY3JlZW5FdmVudC5zZXRQbGF5U3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmJ1bGxldFNjcmVlbkV2ZW50LnNldEJ1bGxldFNjcmVlbih7IF9jb250ZXh0bWVudTogZmFsc2UgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5idWxsZXRTY3JlZW5FdmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09PSAnY2xpY2snKSBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZUNvbnRleHRtZW51LCB0cnVlKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBfY2xvc2VDb250ZXh0bWVudSwgdHJ1ZSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIF9jbG9zZUNvbnRleHRtZW51LCB0cnVlKTtcclxuXHJcbiAgICAgICAgYnVsbGV0U2NyZWVuRW5naW5lLmJpbmQoJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5zZXRCdWxsZXRTY3JlZW4oeyBsYXllcjogbGF5ZXIsIF9jb250ZXh0bWVudTogdHJ1ZSB9LCBsYXllciAhPSBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHBhdXNlKSBlLnNldFBsYXlTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgdG9wID0gZS5jbGllbnRZLCBsZWZ0ID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICBpZiAodG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB0b3AgLT0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0ICsgZWxlbWVudC5jbGllbnRXaWR0aCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgbGVmdCAtPSBlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGAke3RvcH1weGA7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xyXG4gICAgICAgICAgICBlbGVtZW50LmJ1bGxldFNjcmVlbkV2ZW50ID0gZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnVsbGV0U2NyZWVuRW5naW5lLmJpbmQoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAobGF5ZXIgIT0gbnVsbCkgZS5zZXRCdWxsZXRTY3JlZW4oeyBsYXllcjogbGF5ZXIgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmIChwYXVzZSkgZS5zZXRQbGF5U3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidWxsZXRTY3JlZW5FbmdpbmUuYmluZCgnbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICghZS5nZXRCdWxsZXRTY3JlZW4oKS5fY29udGV4dG1lbnUgJiYgcGF1c2UpIGUuc2V0UGxheVN0YXRlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDb250ZXh0bWVudSB9Il0sImZpbGUiOiJjb250ZXh0bWVudS5qcyJ9
